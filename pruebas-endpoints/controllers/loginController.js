import LoginModel from "../model/loginModel.js";
import iSession from "../sessions/iSession.js";

/**
 * Esta clase es la encargada de manejar todos los metodos encargados del controlador del login
 */
class LoginController {
  static #verifySessionExist = (req, res) => {
    if (iSession.sessionExist(req))
      return res.status(400).send("Ya estas logueado");
  };

  static #verifyData = (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) return res.status(400).send("Faltan datos");
  };

  static verifyUser = (req, res) => {
    const userExist = LoginModel.userExist({ user: req.body.user });
    if (!userExist) return res.status(404).send("El usuario no existe");
  };

  static verifyBlockedUser = (req, res) => {
    const usuarioBloqueado = LoginModel.verificaBloqueo({
      user: req.body.user,
    });
    if (usuarioBloqueado) return res.status(400).send("Usuario bloqueado");
  };

  static verifyPassword = (req, res) => {
    const passwordCorrect = LoginModel.passwordCorrect({
      user: req.body.user,
      password: req.body.password,
    });
    if (!passwordCorrect) {
      LoginModel.disminuirIntentos({ user: req.body.user });
      return res.status(400).send("Contraseña incorrecta");
    }
  };

  static desbloquearUsuario = ({user}) =>  LoginModel.desbloquearUsuario({ user });

  static middlewareAuth = (req, res, next) => {
    if (this.#verifySessionExist(req, res)) return;
    if (this.#verifyData(req, res)) return;
    if (this.verifyUser(req, res)) return;
    if (this.verifyBlockedUser(req, res)) return;
    if (this.verifyPassword(req, res)) return;

    next();
  };

  static loginPost = (req, res) => {
    console.log(req.session);

    LoginModel.restaurarIntentos({ user: req.body.user });

    const datos = LoginModel.retornarDatos({
      user: req.body.user,
      password: req.body.password,
    });

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
