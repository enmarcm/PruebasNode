import { hash } from "bcrypt";
import iSession from "../data/session-data/iSession.js";
import LoginModel from "../models/loginModel.js";
import olvidoDatosModel from "../models/olvidoDatosModel.js";
import iPgHandler from "../data/pg-handler-data/iPgHandler.js";

class olvidoDatosController {
  static getOlvidoDatos = async (req, res) => {
    if (this.#verifySession(req, res)) return;

    return res.json({
      message:
        "Estas en el GET para recuperar los datos, envia el username a recuperar con el metodoo POST",
    });
  };

  static postOlvidoDatos = async (req, res) => {
    if (this.#verifySession(req, res)) return;

    const { user } = req.body;

    const verifyUser = await LoginModel.verifyUser({ user });
    if (!verifyUser) return res.json({ error: "El usuario no existe" });

    const verifyBlock = await LoginModel.verifyBlock({ user });
    if (verifyBlock) return res.json({ error: "El usuario esta bloqueado" });

    const infoUser = { questions: [], user };
    iSession.createSesion({ req, infoUser });

    return res.redirect(303, "/olvidoDatos/cargarPreguntas");
  };

  static getCargarPreguntas = async (req, res) => {
    if (this.#verifySession(req, res)) return;
    if (this.#verifyQuestions(req, res)) return;

    const { user } = req.session;
    const preguntas = await olvidoDatosModel.cargarPreguntas({ user });
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
  };

  static postCargarPreguntas = async (req, res) => {
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
    const hashRespuestas = await olvidoDatosModel.obtenerRespuestas({
      index: idQuestionMap,
    });

    for (const answer of answers) {
      const dato = answer.answer.toLowerCase();
      const validate =
        (await iPgHandler.compararEncriptado({
          dato,
          hash: hashRespuestas[0].answer,
        })) || 
        (await iPgHandler.compararEncriptado({
          dato,
          hash: hashRespuestas[1].answer,
        }));

      if (!validate)
        return res.json({ error: "Una o ambas respuestas son incorrectas" });
    }

    iSession.destroySessionRecovery(req)
    return res.json({ error: "Las respuestas son correctas" });
  };

  static #verifySession = (req, res) => {
    if (iSession.sessionExist(req))
      return res.json({
        message:
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
}

export default olvidoDatosController;
