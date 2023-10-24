import iSession from "../data/session-data/iSession.js";
import iMailer from "../data/mailer-data/iMailer.js";
import UserModel from "../models/userModel.js";
import CryptManager from "../components/CryptManager.js";
import { verifyAnswerQuestion } from "../schemas/userSchema.js";

class olvidoDatosController {
  //* Metodos privados de las operaciones de la clase

  static #changePass = async ({ user, randomPassword, emailUser }) => {
    try {
      const result = await iMailer.sendMail({
        to: emailUser,
        subject: "Nueva contraseña",
        text: `Tu nueva contraseña es: ${randomPassword}`,
      });
      if (result.error) return false;

      await UserModel.updatePassword({
        user,
        password: randomPassword,
      });
      return true;
    } catch (error) {
      return { error };
    }
  };

  static #verifySession = (req, res) => {
    if (iSession.sessionExist(req))
      return res.json({
        error:
          "Tienes una sesion activa, debes desloguearte para poder recuperar los datos",
      });
  };

  static #verifyQuestions = (req, res) => {
    if (!req.session.questions)
      return res.json({
        error:
          "No estas solicitando recuperar los datos, por lo que no puedes acceder a esta ruta",
      });
  };

  static #seleccionarDosPreguntas = ({ preguntas } = []) => {
    if (preguntas.length === 0)
      return { error: "No hay preguntas para seleccionar" };

    const index1 = Math.floor(Math.random() * preguntas.length);

    let index2 = Math.floor(Math.random() * preguntas.length);

    while (index2 === index1) {
      index2 = Math.floor(Math.random() * preguntas.length);
    }

    const result = [preguntas[index1], preguntas[index2]];
    return result;
  };

  static #verifyAnswers = async ({ questions, answers }) => {
    try {
      const idQuestionMap = questions.map((question) => question.idquestion);
      const hashRespuestas = await UserModel.obtenerRespuestas({
        index: idQuestionMap,
      });

      for (const answer of answers) {
        const dato = answer.answer.toLowerCase();
        const validate =
          (await CryptManager.compararEncriptado({
            dato,
            hash: hashRespuestas[0].answer,
          })) ||
          (await CryptManager.compararEncriptado({
            dato,
            hash: hashRespuestas[1].answer,
          }));

        if (!validate)
          return { error: "Una o ambas respuestas son incorrectas" };
      }
    } catch (error) {
      return { error };
    }
  };

  static #notAnswers = () => {
    return {
      error:
        "No se enviaron las respuestas o se enviaron en formato incorrecto",
      example: {
        answers: [{ answer: "Respuesta 1" }, { answer: "Respuesta 2" }],
      },
    };
  };

  //* Cada uno de los endpoints de olvidoDatos
  static getOlvidoDatos = (req, res) => {
    if (this.#verifySession(req, res)) return;

    return res.json({
      message:
        "Estas en el GET para recuperar los datos, envia el username a recuperar con el metodoo POST",
    });
  };

  static postOlvidoDatos = async (req, res) => {
    try {
      if (this.#verifySession(req, res)) return;

      const { user } = req.body;

      const verifyUser = await UserModel.verifyUser({ user });
      if (!verifyUser) return res.json({ error: "El usuario no existe" });

      const verifyBlock = await UserModel.verifyBlock({ user });
      if (verifyBlock) return res.json({ error: "El usuario esta bloqueado" });

      const infoUser = { questions: [], user };
      iSession.createSesion({ req, infoUser });

      return res.redirect(303, "/olvidoDatos/cargarPreguntas");
    } catch (error) {
      return { error };
    }
  };

  static getCargarPreguntas = async (req, res) => {
    try {
      if (this.#verifySession(req, res)) return;
      if (this.#verifyQuestions(req, res)) return;

      const { user } = req.session;
      const preg = await UserModel.cargarPreguntas({ user });

      const preguntas = this.#seleccionarDosPreguntas({ preguntas: preg });
      req.session.questions = preguntas;

      const questions = preguntas.map((pregunta) => {
        const obj = { question: pregunta.question };
        return obj;
      });

      const objInfo = {
        message: "Responde las preguntas de seguridad usando el POST",
        questions,
      };
      res.json(objInfo);
    } catch (error) {
      return { error };
    }
  };

  static postCargarPreguntas = async (req, res) => {
    try {
      if (this.#verifySession(req, res)) return;
      if (this.#verifyQuestions(req, res)) return;

      const { user, questions } = req.session;
      const { answers } = req.body;

      if (!answers) return res.json(this.#notAnswers());

      const answerSchema = await verifyAnswerQuestion({ answers });
      if (answerSchema?.error) return res.json(answerSchema);

      const verifyAnswers = await this.#verifyAnswers({ questions, answers });
      if (verifyAnswers?.error) return res.json(verifyAnswers);

      iSession.destroySessionRecovery(req);

      const randomPassword = CryptManager.generarRandom();

      const emailUser = await UserModel.getMail({ user });

      const change = await this.#changePass({
        user,
        randomPassword,
        emailUser,
      });
      if (!change)
        return res.json({
          error: "Ha ocurrido un error al cambiar la pass o enviar el correo",
        });

      return res.json({ message: "Se ha enviado un correo con la contraseña" });
    } catch (error) {
      return res.json({
        error: "Error en el servidor",
        messageError: error.message,
      });
    }
  };

  //* Endpoints de desbloquear
  static getDesbloquear = async (req, res) => {
    if (this.#verifySession(req, res)) return;

    return res.json({
      message:
        "Estas en el GET para desbloquear, envia el username a desbloquear con el metodo POST de la siguiente manera:",
      example: {
        user: "username",
      },
    });
  };
  static postDesbloquear = async (req, res) => {
    if (this.#verifySession(req, res)) return;

    const { user } = req.body;
    if (!(await UserModel.verifyBlock({ user })))
      return res.json({ error: `El usuario ${user} no esta bloqueado` });

    const infoUser = { questions: [], user };
    iSession.createSesion({ req, infoUser });

    return res.redirect(303, "/olvidoDatos/cargarPreguntas");
  };

  static postDesbloquearCargarPreguntas = async (req, res) => {
    try {
      if (this.#verifySession(req, res)) return;
      if (this.#verifyQuestions(req, res)) return;

      const { user, questions } = req.session;
      const { answers } = req.body;

      if (!answers) return res.json(this.#notAnswers());

      const answerSchema = await verifyAnswerQuestion({ answers });
      if (answerSchema?.error) return res.json(answerSchema);

      const verifyAnswers = await this.#verifyAnswers({ questions, answers });
      if (verifyAnswers?.error) return res.json(verifyAnswers);
      iSession.destroySessionRecovery(req);

      const result = await UserModel.desbloquear({ user });
      if (result?.error) res.send({ error: "Error al desbloquear" });

      return res.send({ message: "Usuario desbloqueado, vuelva a ingresar" });
    } catch (error) {
      return { error };
    }
  };
}

export default olvidoDatosController;
