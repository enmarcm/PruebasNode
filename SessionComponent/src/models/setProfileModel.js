import iPgHandler from "../data/pg-handler-data/iPgHandler.js"
import iSession from "../data/session-data/iSession.js"
class setProfileModel{
    static getProfiles = async ({user}) => { 
        const profiles = await iPgHandler.executeQuery({key: "getProfiles", params: [user]})
        
        return profiles
    }
}

export default setProfileModel