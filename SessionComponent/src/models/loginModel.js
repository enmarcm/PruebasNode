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

    //TODO PREGUNTAR COMO PUEDO EVITAR ESTAR HACIENDO ESTO
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

  static restoreIntentos = async ({ user }) => {
    const result = await iPgHandler.executeQuery({
      key: "restoreIntentos",
      params: [user],
    });

    return result;
  };

  static verifyIntentos = async ({ user }) => {
    const result = await iPgHandler.executeQuery({
      key: "verifyIntentos",
      params: [user],
    });

    return result;
  };

  static disminuirIntentos = async ({ user }) => {
    const [intentos] = await this.verifyIntentos({ user });
    if (intentos.at_user_web <= 0) return;

    const result = await iPgHandler.executeQuery({
      key: "disminuirIntentos",
      params: [user],
    });
    return result;
  };

  static bloquear = async ({ user }) => {
    const result = await iPgHandler.executeQuery({
      key: "bloquear",
      params: [user],
    });
    return result;

  }

  static retornarDatos = async ({ user , password}) => {
    if(!await this.verifyPassword({user,password})) return false
    
    const [result] = await iPgHandler.executeQuery({key: 'getDataSession', params: [user]})
    const data = {
      idUser: result.id_user_web,
      user: result.us_user_web,
      profile: result.na_profile,
      email: result.em_user_web,
    }

    return data
  }
}

export default LoginModel;
