import setProfileModel from "../models/setProfileModel.js";

class setProfileController {
  static getProfiles = async (req, res) => {
    const { user } = req.session;
    const profiles = await setProfileModel.getProfiles({ user });

    const profilesMap = profiles.map((e) => e.na_profile);
    req.session.profiles = profilesMap;

    if (profilesMap.length === 1) {
      return this.#putProfile(req, res, profilesMap[0])
    }
    return res.send(profilesMap);
  };

  static setProfile = async (req, res) => {
    const { user, profiles } = req.session;
    const { profile } = req.body;

    if (profiles.includes(profile)) {
      return this.#putProfile(req, res, profile)
    }
    return res.json({ error: "El perfil seleccionado no es valido o ocurrio un error" });
  };

  static #putProfile = (req, res, profile) => {
    const { user } = req.session
    if (setProfileModel.hasProfile({ user, profile })) {
      delete req.body.profiles
      req.session.profile = profile;
      return res.json({ message: `Se selecciono el perfil ${req.session.profile}` }); 
    }
    return res.json({message: "El perfil seleccionado no es valido"})
  }
}

export default setProfileController;
