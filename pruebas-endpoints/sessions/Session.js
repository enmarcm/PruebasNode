import session from "express-session";
class Session {
  /**
   * Constructor de la clase session
   * @param {Obj} objConfig
   * @param {Obj} objConfig.config 
   */
  constructor({ config }) {
    this.config = config;
    this.session = session(config);
  }

  loadSession = (req, res, next) => this.session(req, res, next);
  
  createSesion = ({ req, infoUser }) => {
    if (this.sessionExist(req)) return false;

    for (const key in infoUser) {
      req.session[key] = infoUser[key];
    }

    return true;
  };

  destroySession = (req) => {
    if(!this.sessionExist(req)) return false;
    req.session.destroy();
  };

  sessionExist = (req) => {
    if (req.session && req.session?.user) return true;
    return false;
  };

  midSessionExist = (req, res, next) => {
    if (this.sessionExist(req)) return next();
    res.status(401).send("No tienes sesion activa");
  }

  updateSession = ({ req, infoUser }) => {
    if (this.sessionExist(req)) return false;

    this.createSesion({ req, infoUser });
  };
}
export default Session;
