import iPgHandler from "../data/pg-handler-data/iPgHandler.js"

class LoginModel{
    static verifyUser = async({ user }) =>{
        const resultado = await iPgHandler.executeQuery({ key: "verifyUser", params: [user] })
        
        return resultado.length > 0 ? resultado[0] : false;
    }
}

export default LoginModel;