import iSession from "../data/session-data/iSession.js";
import UserModel from "../models/userModel.js";
import { verifyUpdateUser } from "../schemas/userSchema.js";

class changePasswordController {
  static getChangePassword = (req, res) => {
    const { user } = req.session;

    return res.json({
      message: `Hola ${user}. Este es el endpoint para cambiar password, si deseas cambiarla, envia un post con este formato `,
      example: {
        claveActual: "tuPasswordActual",
      },
    });
  };
  static postChangePassword = async (req, res) => {
    const { user } = req.session;
    const { claveActual } = req.body;

    if (!claveActual)
      return res.json({
        error: "No se envio la clave actual o se hizo en el formato incorrecto",
      });

    const resultClave = await UserModel.verifyPassword({
      user,
      password: claveActual,
    });

    if (!resultClave)
      return res.json({ error: "La clave actual no es correcta" });

    return res.redirect(303, "/changePassword/newPassword");
  };

  static getNewPassword = (req, res) => {
    const { user } = req.session;

    return res.json({
      message: `Hola ${user}. Ingresa tu nueva password, esta, debe tener un minimo de 8 caracteres y un maximo de 20. Hazlo bajo el siguiente formato y envialo en un POST a /changePassword/newPassword`,
      example: {
        nuevaPassword: "nuevaPass",
      },
    });
  };

  static postNewPassword = async (req, res) => {
    const { user } = req.session;
    const { nuevaPassword } = req.body;

    if (!nuevaPassword)
      return res.json({
        error: "No se envio la nueva clave o se hizo en el formato incorrecto",
      });

    const passwordValida = await verifyUpdateUser({
      data: {password: nuevaPassword},
    });
    if (!passwordValida.success)
      return res.json({
        error: `Se envio en formato incorrecto ${passwordValida.error.message}`,
      });

    const result = await UserModel.updatePassword({
      user,
      password: nuevaPassword,
    });

    if (result.error) return res.json({ error: result.error.message });

    iSession.destroySession(req)
    return res.json({
      message:
        "Se actualizo la password correctamente, vuelva a iniciar sesion",
    });
  };
}

export default changePasswordController;
