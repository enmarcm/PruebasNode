import LoginModel from "../models/loginModel.js";
import iSession from "../data/session-data/iSession.js";

/**
 * Controlador para el inicio de sesión de usuarios.
 */
class LoginController {
  /**
   * Verifica si los datos de inicio de sesión son válidos.
   * @param {Object} req - Objeto de petición HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   * @returns {void}
   */
  static verifyData = (req, res) => {
    const { user, password } = req.body;
    if (!user || !password)
      return res.status(400).send("Faltan datos para ingresar sesión");
  };

  /**
   * Verifica si el usuario existe en la base de datos.
   * @async
   * @param {Object} req - Objeto de petición HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   * @returns {Promise<Object>} - Objeto de respuesta HTTP con el resultado de la operación.
   */
  static verifyUser = async (req, res) => {
    const { user } = req.body;
    const userExist = await LoginModel.verifyUser({ user });
    if (!userExist) return res.status(400).send("El usuario no existe");
  };

  /**
   * Verifica si el usuario está bloqueado.
   * @async
   * @param {Object} req - Objeto de petición HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   * @returns {Promise<Object>} - Objeto de respuesta HTTP con el resultado de la operación.
   */
  static verifyBlock = async (req, res) => {
    const userBlocked = await LoginModel.verifyBlock({ user: req.body.user });
    if (userBlocked) return res.status(400).send("Usuario bloqueado");
  };

  /**
   * Verifica si la contraseña es correcta.
   * @async
   * @param {Object} req - Objeto de petición HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   * @returns {Promise<Object>} - Objeto de respuesta HTTP con el resultado de la operación.
   */
  static verifyPassword = async (req, res) => {
    const { user, password } = req.body;
    const passwordCorrect = await LoginModel.verifyPassword({ user, password });

    if (!passwordCorrect) {
      await LoginModel.disminuirIntentos({ user });
      return res.status(400).send(
        `Contraseña incorrecta, te quedan ${this.obtenerIntentos({
          req,
        })} intentos`
      );
    }
  };

  /**
   * Obtiene el número de intentos restantes para iniciar sesión.
   * @async
   * @param {Object} req - Objeto de petición HTTP.
   * @returns {Promise<number>} - Número de intentos restantes.
   */
  static obtenerIntentos = async ({ req }) => {
    const { user } = req.body;
    const intentos = await LoginModel.verifyIntentos({ user });
    return intentos;
  };

  //* Desde aqui se manejan los middlewares.

  /**
   * Middleware para verificar si el usuario está autenticado.
   * @async
   * @param {Object} req - Objeto de petición HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   * @param {Function} next - Función para pasar al siguiente middleware.
   * @returns {Promise<Object>} - Objeto de respuesta HTTP con el resultado de la operación.
   */
  static midAuth = async (req, res, next) => {
    if (iSession.sessionExist(req))
      return res.status(400).send("Ya estás logueado");
    if (this.verifyData(req, res)) return;
    if (await this.verifyUser(req, res)) return;
    if (await this.verifyBlock(req, res)) return;
    if (await this.verifyPassword(req, res)) return;
    return next();
  };

  //* Desde aqui se manejan los endpoints desde los routers.

  /**
   * Maneja la petición POST para iniciar sesión.
   * @param {Object} req - Objeto de petición HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   * @returns {void}
   */
  static loginPost = async (req, res) => {
    const { user, password } = req.body;
    // await LoginModel.restoreIntentos({ user });
    await LoginModel.disminuirIntentos({ user });

    const datos = await LoginModel.retornarDatos({
      user,
      password,
    });

    const infoUser = {
      idUser: datos.idUser,
      user: datos.user,
      profile: datos.profile,
      email: datos.email,
    };

    return iSession.createSesion({ req, infoUser })
      ? res.status(201).send(`Te has logueado correctamente ${infoUser.user}`)
      : res
          .status(400)
          .send(`No se pudo crear la sesión para ${infoUser.user}`);
  };
}

export default LoginController;
