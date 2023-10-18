import iPgHandler from "../data/pg-handler-data/iPgHandler.js";
import iSession from "../data/session-data/iSession.js";
class setProfileModel {
  static getProfiles = async ({ user }) => {
    const profiles = await iPgHandler.executeQuery({
      key: "getProfiles",
      params: [user],
    });

    return profiles;
  };

  static hasProfile = async ({ user, profile }) => {
    const result = await iPgHandler.executeQuery({
      key: "hasProfile",
      params: [user, profile],
    });
    return result;
  };
}

export default setProfileModel;
