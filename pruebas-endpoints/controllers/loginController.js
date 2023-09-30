import LoginModel from "../model/loginModel.js";
import MAP_SESSIONS from "../utils/mapSessions.js";

class LoginController {
  static loginPost = (req, res) => {
    if (MAP_SESSIONS.has(req.sessionID) && req.session)
      return res.status(400).send("Ya estas logueado");

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

    //Queria destructurar pero ya tengo una constante user y password
    const datos = LoginModel.retornarDatos({ user, password });

    MAP_SESSIONS.set(req.sessionID, datos.user);

    req.session.user = datos.user;
    req.session.rol = datos.rol;
    req.session.admin = datos.admin;
    req.session.email = datos.email

    res.status(201).send("Te has logueado correctamente");
  };
}
export default LoginController;
