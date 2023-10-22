import iSession from "../data/session-data/iSession.js";
import iMailer from "../data/mailer-data/iMailer.js";
import UserModel from "../models/userModel.js";
import CryptManager from "../components/CryptManager.js";

class olvidoDatosController {
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

      //TODO: Hacer schema de answers

      if (!answers)
        return res.json({
          error:
            "No se enviaron las respuestas o se enviaron en formato incorrecto",
          example: {
            answers: [{ answer: "Respuesta 1" }, { answer: "Respuesta 2" }],
          },
        });

      const idQuestionMap = questions.map((question) => question.idquestion);
      const hashRespuestas = await UserModel.obtenerRespuestas({
        index: idQuestionMap,
      });

      //TODO: MEJORAR TODO ESTO, ESTA MUY FEO Y ACOPLADO AQUI
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
          return res.json({ error: "Una o ambas respuestas son incorrectas" });
      }

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
}

export default olvidoDatosController;
