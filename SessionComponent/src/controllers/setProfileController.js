import UserModel from "../models/userModel.js";

class setProfileController {
  static getProfiles = async (req, res) => {
    try {
      const { user } = req.session;
    const profiles = await UserModel.getProfiles({ user });

    const profilesMap = profiles.map((e) => e.na_profile);
    req.session.profiles = profilesMap;

    if (profilesMap.length === 1) {
      return this.#putProfile(req, res, profilesMap[0]);
    }

    const objSend = {
      message: "Selecciona uno de los perfiles disponibles",
      profiles: profilesMap,
    }
    return res.json(objSend);
    } catch (error) {
      return {error}
    }
  };

  static setProfile = async (req, res) => {
    try {
      const { profiles } = req.session;
    const { profile } = req.body;

    if (profiles.includes(profile)) {
      return this.#putProfile(req, res, profile);
    }
    return res.json({
      error: "El perfil seleccionado no es valido o ocurrio un error",
    });
    } catch (error) {
      return {error}
    }
  };

  static #putProfile = (req, res, profile) => {
    const { user } = req.session;
    if (UserModel.hasProfile({ user, profile })) {
      delete req.body.profiles;
      req.session.profile = profile;
      // return res.json({
      //   message: `Se selecciono el perfil ${req.session.profile}`,
      // });
      return res.redirect(303, "/home");
    }
    return res.json({ error: "El perfil seleccionado no es valido" });
  };
}

export default setProfileController;
