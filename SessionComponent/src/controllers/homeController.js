import iSecurity from "../data/security-data/iSecurity.js";
import iSession from "../data/session-data/iSession.js";
class HomeController {
  static getHome = (req, res) => {
    if (!iSession.sessionExist(req))
      return res.json({ error: "No hay una sesion iniciada" });

    const { profile } = req.session;
    const infoProfile = iSecurity.permissions.get(profile);
    const json = {
      userProfile: profile,
      message: `Estos son los metodos que tienes disponibles con el perfil que iniciaste, con /toProcess puedes ejecutarlos`,
      ...infoProfile,
    };

    return res.json(json);
  };
}

export default HomeController
