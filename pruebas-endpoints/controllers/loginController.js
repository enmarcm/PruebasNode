import LoginModel from "../model/loginModel.js";
import iSession from "../iSession.js";

class LoginController {
  static loginPost = (req, res) => {
    if (iSession.sessionExist(req)) return res.status(400).send("Ya estas logueado");

    const { user, password } = req.body;
    if (!user || !password) return res.status(400).send("Faltan datos");

    const userExist = LoginModel.userExist({ user });
    if (!userExist) return res.status(404).send("El usuario no existe");

    const usuarioBloqueado = LoginModel.verificaBloqueo({ user });
    if (usuarioBloqueado) return res.status(400).send("Usuario bloqueado");

    const passwordCorrect = LoginModel.passwordCorrect({ user, password });
    if (!passwordCorrect) {
      LoginModel.disminuirIntentos({ user });
      return res.status(400).send("Contraseña incorrecta");
    }

    LoginModel.restaurarIntentos({ user });

    const datos = LoginModel.retornarDatos({ user, password });

    const infoUser = {
      user: datos.user,
      rol: datos.rol,
      admin: datos.admin,
      email: datos.email,
    };

    if (iSession.createSesion({ req, infoUser })) {
      return res.status(201).send("Te has logueado correctamente");
    } else {
      return res.status(400).send("Ocurrio un error al momento de loguear");
    }
  };
}
export default LoginController;
