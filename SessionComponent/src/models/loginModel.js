import iPgHandler from "../data/pg-handler-data/iPgHandler.js";

class LoginModel {
  static verifyUser = async ({ user }) => {
    const resultado = await iPgHandler.executeQuery({
      key: "verifyUser",
      params: [user],
    });

    return resultado.length > 0 ? resultado[0] : false;
  };

  static verifyBlock = async ({ user }) => {
    const [resultBlock] = await iPgHandler.executeQuery({
      key: "verifyBlock",
      params: [user],
    });

    const [resultAttemps] = await iPgHandler.executeQuery({
      key: "verifyAttempts",
      params: [user],
    });

    const isBlock = resultBlock.bl_user_web;
    const attempts = resultAttemps.at_user_web;

    return isBlock || attempts <= 0 ? true : false;
  };

  static verifyPassword = async ({ user, password }) => {
    const [resultPass] = await iPgHandler.executeQuery({
      key: "selectPassUser",
      params: [user],
    });

    const pass = resultPass.pa_user_web;

    const result = await iPgHandler.compararEncriptado({
      dato: password,
      hash: pass,
    });

    return result;
    };
    
    static restoreIntentos = async ({ user }) => { }
}

export default LoginModel;
