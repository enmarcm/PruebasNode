import LoginModel from "../model/loginModel.js";
import MAP_SESSIONS from "../utils/mapSessions.js";

class LoginController {
  static loginPost = (req, res) => {
    if (MAP_SESSIONS.has(req.sessionID) && req.session)
      return res.status(400).send("Ya estas logueado");

    const { user, password } = req.body;
    if (!user || !password) return res.status(400).send("Faltan datos");
    console.log(user, password)

    // const userExist = LoginModel.userExist({ user });
    // if (!userExist) return res.status(404).send("El usuario no existe");

    // const passwordCorrect = LoginModel.passwordCorrect({ user, password });
    // if (!passwordCorrect) {
    //   LoginModel.disminuirIntentos({ user });
    //   return res.status(400).send("Contraseña incorrecta");
    // }

    // const usuarioBloqueado = LoginModel.verificaBloqueo({ user });
    // if (usuarioBloqueado) return res.status(400).send("Usuario bloqueado");

    // LoginModel.restaurarIntentos({ user });

    // //Queria destructurar pero ya tengo una constante user y password
    // const datos = LoginModel.retornarDatos({ user, password });

    // MAP_SESSIONS.set(req.sessionID, datos.user);
    // req.session = {
    //   user: datos.user,
    //   rol: datos.rol,
    //   email: datos.email,
    //   admin: datos.admin,
    // };

    // res.send("Te has logueado correctamente");
  };
}
export default LoginController;
