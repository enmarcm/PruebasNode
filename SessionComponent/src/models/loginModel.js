/**
 * @file Modelo de login de la aplicación.
 * @name loginModel.js
 */

import iPgHandler from "../data/pg-handler-data/iPgHandler.js";

/**
 * Clase que representa el modelo de login de la aplicación.
 * @class
 */
class LoginModel {
  /**
   * Método estático que verifica si un usuario existe en la base de datos.
   * @static
   * @async
   * @function
   * @param {Object} params - Los parámetros de entrada del método.
   * @param {string} params.user - El nombre de usuario del usuario.
   * @returns {Promise} Una promesa que resuelve con el resultado de la consulta a la base de datos.
   */
  static verifyUser = async ({ user }) => {
    const resultado = await iPgHandler.executeQuery({
      key: "verifyUser",
      params: [user],
    });

    return resultado.length > 0 ? resultado[0] : false;
  };

  /**
   * Método estático que verifica si un usuario está bloqueado o ha excedido el número de intentos de inicio de sesión fallidos.
   * @static
   * @async
   * @function
   * @param {Object} params - Los parámetros de entrada del método.
   * @param {string} params.user - El nombre de usuario del usuario.
   * @returns {Promise} Una promesa que resuelve con un valor booleano que indica si el usuario está desbloqueado o no.
   */
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

    return (isBlock || attempts) <= 0 ? true : false;
  };

  /**
   * Método estático que verifica si la contraseña de un usuario es correcta.
   * @static
   * @async
   * @function
   * @param {Object} params - Los parámetros de entrada del método.
   * @param {string} params.user - El nombre de usuario del usuario.
   * @param {string} params.password - La contraseña del usuario.
   * @returns {Promise} Una promesa que resuelve con un valor booleano que indica si la contraseña es correcta o no.
   */
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

  /**
   * Método estático que restaura el número de intentos de inicio de sesión fallidos de un usuario.
   * @static
   * @async
   * @function
   * @param {Object} params - Los parámetros de entrada del método.
   * @param {string} params.user - El nombre de usuario del usuario.
   * @returns {Promise} Una promesa que resuelve con el resultado de la consulta a la base de datos.
   */
  static restoreIntentos = async ({ user }) => {
    const result = await iPgHandler.executeQuery({
      key: "restoreIntentos",
      params: [user],
    });

    return result;
  };

  /**
   * Método estático que verifica el número de intentos de inicio de sesión fallidos de un usuario.
   * @static
   * @async
   * @function
   * @param {Object} params - Los parámetros de entrada del método.
   * @param {string} params.user - El nombre de usuario del usuario.
   * @returns {Promise} Una promesa que resuelve con el número de intentos de inicio de sesión fallidos de un usuario.
   */
  static verifyIntentos = async ({ user }) => {
    const [result] = await iPgHandler.executeQuery({
      key: "verifyIntentos",
      params: [user],
    });

    return result;
  };

  /**
   * Método estático que disminuye el número de intentos de inicio de sesión fallidos de un usuario.
   * @static
   * @async
   * @function
   * @param {Object} params - Los parámetros de entrada del método.
   * @param {string} params.user - El nombre de usuario del usuario.
   * @returns {Promise} Una promesa que resuelve con el resultado de la consulta a la base de datos.
   */
  static disminuirIntentos = async ({ user }) => {
    const intentos = await this.verifyIntentos({ user });
    if (intentos.at_user_web <= 0) return;

    const result = await iPgHandler.executeQuery({
      key: "disminuirIntentos",
      params: [user],
    });
    return result;
  };

  /**
   * Método estático que bloquea el acceso de un usuario a la aplicación.
   * @static
   * @async
   * @function
   * @param {Object} params - Los parámetros de entrada del método.
   * @param {string} params.user - El nombre de usuario del usuario.
   * @returns {Promise} Una promesa que resuelve con el resultado de la consulta a la base de datos.
   */
  static bloquear = async ({ user }) => {
    const result = await iPgHandler.executeQuery({
      key: "bloquear",
      params: [user],
    });
    return result;
  };

  /**
   * Método estático que retorna los datos de sesión de un usuario.
   * @static
   * @async
   * @function
   * @param {Object} params - Los parámetros de entrada del método.
   * @param {string} params.user - El nombre de usuario del usuario.
   * @param {string} params.password - La contraseña del usuario.
   * @returns {Promise} Una promesa que resuelve con los datos de sesión de un usuario.
   */
  static retornarDatos = async ({ user, password }) => {
    if (!(await this.verifyPassword({ user, password }))) return false;

    const [result] = await iPgHandler.executeQuery({
      key: "getDataSession",
      params: [user],
    });
    const data = {
      idUser: result.id_user_web,
      user: result.us_user_web,
      profile: result.na_profile,
      email: result.em_user_web,
    };

    return data;
  };
}

export default LoginModel;
