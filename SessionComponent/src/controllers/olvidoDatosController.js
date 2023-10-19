import iSession from "../data/session-data/iSession.js";
import LoginModel from "../models/LoginModel.js";

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

    req.session.questions = null;

    return res.redirect(303, "/olvidoDatos/cargarPreguntas");
  };

  static getCargarPreguntas = async (req, res) => {
    if (!req.session.questions)
      return res.json({
        error:
          "No estas solicitando recuperar los datos, por lo que no puedes acceder a esta ruta",
      });

    const preguntas = await LoginModel.getPreguntas();
    //Luego entonces se debe de enviar el formulario con las preguntas
    //Luego para enviar se deben usar el POST
  };
}

export default olvidoDatosController;
