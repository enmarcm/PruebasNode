import iSession from "../data/session-data/iSession.js";
import LoginModel from "../models/loginModel.js";
import olvidoDatosModel from "../models/olvidoDatosModel.js";

class olvidoDatosController {
  static getOlvidoDatos = async (req, res) => {
    if (iSession.sessionExist(req))
      return res.json({
        message:
          "Tienes una sesion activa, debes desloguearte para poder recuperar los datos",
      });

    return res.json({
      message:
        "Estas en el GET para recuperar los datos, envia el username a recuperar con el metodoo POST",
    });
  };

  static postOlvidoDatos = async (req, res) => {
    const { user } = req.body;

    const verifyUser = await LoginModel.verifyUser({ user });
    if (!verifyUser) return res.json({ error: "El usuario no existe" });

    const verifyBlock = await LoginModel.verifyBlock({ user });
    if (verifyBlock) return res.json({ error: "El usuario esta bloqueado" });

    const infoUser = {questions: [], user}
    iSession.createSesion({req, infoUser})

    return res.redirect(303, "/olvidoDatos/cargarPreguntas");
  };

  static getCargarPreguntas = async (req, res) => {
    if (!req.session.questions)
      return res.json({
        error:
          "No estas solicitando recuperar los datos, por lo que no puedes acceder a esta ruta",
      });

    const { user } = req.session;
    const preguntas = await olvidoDatosModel.cargarPreguntas({ user });
    req.session.questions = preguntas

    const questions = preguntas.map((pregunta, i) => {
      const obj = { question: pregunta.question }
      return obj
    });
    
    const objInfo = {message: "Responde las preguntas de seguridad usando el POST", questions}
    res.json(objInfo)
  };
}

export default olvidoDatosController;
