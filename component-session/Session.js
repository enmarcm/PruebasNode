import session from "express-session";
class Session {
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
    req.session.destroy();
  };

  sessionExist = (req) => {
    if (req.session && req.session?.user) return true;
    return false;
  };

  updateSession = ({ req, infoUser }) => {
    if (this.sessionExist(req)) return false;

    this.createSesion({ req, infoUser });
  };
}
export default Session;
