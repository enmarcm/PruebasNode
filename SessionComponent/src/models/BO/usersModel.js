import iPgHandler from "../../data/pg-handler-data/iPgHandler.js";
import CryptManager from "../../components/CryptManager.js";

/**
 * Clase que representa el modelo de datos para los usuarios.
 */
class usersModel {
  /**
   * Agrega un nuevo usuario a la base de datos.
   * @async
   * @param {Object} options - Las opciones para agregar el usuario.
   * @param {string} options.user - El nombre de usuario.
   * @param {string} options.password - La contraseña del usuario.
   * @param {string} options.email - El correo electrónico del usuario.
   * @param {Array<Object>} options.questions - Las preguntas de seguridad del usuario.
   * @param {Array<string>} options.profiles - Los perfiles del usuario.
   * @returns {Promise<Object>} El objeto JSON con el resultado de la transacción o un mensaje de error.
   */
  static async addUser({ user, password, email, questions, profiles }) {
    try {
      const hashedPass = await CryptManager.encriptar({ dato: password });

      const addQuery = { key: "addUser", params: [user, hashedPass, email] };
      const profilesQuery = profiles.map((elemento) => {
        const obj = { key: "setProfileUser", params: [user, elemento] };
        return obj;
      });

      const questionsQuery = questions.map(async (elemento) => {
        const obj = {
          key: "setQuestionUser",
          params: [
            elemento.question,
            await CryptManager.encriptar({
              dato: elemento.answer.toLowerCase(),
            }),
            user,
          ],
        };

        return obj;
      });

      const questionQueryFull = await Promise.all(questionsQuery);
      const result = await iPgHandler.transaction({querys: [
        addQuery,
        ...profilesQuery,
        ...questionQueryFull,
      ]});

      return result;
    } catch (error) {
      return { error };
    }
  }

  /**
   * Obtiene la información de un usuario de la base de datos.
   * @async
   * @param {Object} options - Las opciones para obtener la información del usuario.
   * @param {string} options.user - El nombre de usuario.
   * @returns {Promise<Object>} El objeto JSON con la información del usuario o un mensaje de error.
   */
  static async seeUser({ user }) {
    try {
      const [result] = await iPgHandler.executeQuery({
        key: "seeUser",
        params: [user],
      });

      return result;
    } catch (error) {
      return { error };
    }
  }
}

export default usersModel;
