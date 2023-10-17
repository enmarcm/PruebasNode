import setProfileModel from "../models/setProfileModel.js";

class setProfileController {
  static getProfiles = async (req, res) => {
    const { user } = req.session
    const profiles = await setProfileModel.getProfiles({ user });

    const profilesMap = profiles.map(e=>e.na_profile)
    res.send(profilesMap);
  };
}

export default setProfileController
