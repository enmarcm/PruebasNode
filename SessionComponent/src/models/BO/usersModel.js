import iPgHandler from "../../data/pg-handler-data/iPgHandler.js";
import CryptManager from "../../components/CryptManager.js";

class usersModel {
  static addUser = async ({ user, password, email, questions, profiles }) => {
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
            await CryptManager.encriptar({ dato: elemento.answer.toLowerCase() }),
            user,
          ],
        };

        return obj;
      });

      const questionQueryFull = await Promise.all(questionsQuery);
      const result = await iPgHandler.transaction([
        addQuery,
        ...profilesQuery,
        ...questionQueryFull,
      ]);

      return result;
    } catch (error) {
      return {error};
    }
  };

  static seeUser = async ({ user }) => {
    try {
      const [result] = await iPgHandler.executeQuery({
        key: "seeUser",
        params: [user],
      });
  
      return result;
    } catch (error) {
      return {error}
    }
  };
}

export default usersModel;
