import iSession from "../data/session-data/iSession.js";

class LogoutController {
  static logoutGet = (req, res) => {
    if (!iSession.sessionExist(req))
      return res.json({ error: "No hay sesión iniciada." });

    req.session.destroy();
    return res.json({ message: "Sesión cerrada." });
  };
}

export default LogoutController