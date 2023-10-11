import iPgHandler from "../../data/pg-handler-data/iPgHandler.js"
class usersModel{
    static addUser = async ({ user, password, email }) => { 
        const hashedPass = await iPgHandler.encriptar({ dato: password })
        
        const result = await iPgHandler.executeQuery({ key: 'addUser', params: [user, hashedPass, email] })
        
        return result
    }

    static seeUser = async ({ user }) => {
        const [result] = await iPgHandler.executeQuery({ key: 'seeUser', params: [user] })

        return result
    }
}

export default usersModel