/**
 * @file users.js Este archivo se encarga de manejar los usuarios con la BDD.
 */

import { verifyAddUser } from "../../../schemas/userSchema.js";
import usersModel from "../../../models/BO/usersModel.js";

/**
 * Clase que representa un conjunto de métodos para manejar usuarios.
 */
class users {
  /**
   * Agrega un nuevo usuario a la base de datos.
   * @async
   * @param {Object} options - Las opciones para agregar el usuario.
   * @param {string} options.user - El nombre de usuario.
   * @param {string} options.password - La contraseña del usuario.
   * @param {string} options.email - El correo electrónico del usuario.
   * @param {Array} options.questions - Las preguntas de seguridad del usuario.
   * @param {Array} options.profiles - Los perfiles del usuario.
   * @returns {Promise<Object>} Un objeto con el resultado de la operación o un objeto con un error.
   */
  addUser = async ({ user, password, email, questions, profiles }) => {
    try {
      const schema = await verifyAddUser({
        data: { user, password, email, questions, profiles },
      });
      if (!schema.success) return schema.error;

      const result = await usersModel.addUser({
        user,
        password,
        email,
        questions,
        profiles,
      });

      if (result.error)
        return {
          error: "Ocurrio un error al crear el usuario",
          errorMessage: result.error.detail,
        };

      return { message: "Usuario creado correctamente" };
    } catch (error) {
      return { error };
    }
  };

  /**
   * Obtiene un usuario de la base de datos.
   * @async
   * @param {Object} options - Las opciones para obtener el usuario.
   * @param {string} options.user - El nombre de usuario a obtener.
   * @returns {Promise<Object>} Un objeto con el resultado de la operación o un objeto con un error.
   */
  static seeUser = async ({ user }) => {
    try {
      const result = await usersModel.seeUser({ user });

      if (!result) return { error: "No existe el usuario" };
      return result;
    } catch (error) {
      return { error };
    }
  };

  // removeUser = async ({ user }) => {
  //   const result = await usersModel.removeUser({ user });

  //   if (result.severity === "ERROR")
  //     return { error: "Ocurrio un error al eliminar el usuario" };
  //   return { message: "Usuario eliminado correctamente" };
  // }
}

export default users;