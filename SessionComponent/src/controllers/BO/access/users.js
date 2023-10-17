import { verifyAddUser } from "../../../schemas/userSchema.js";
import usersModel from "../../../models/BO/usersModel.js";
class users {
  addUser = async ({ user, password, email, questions }) => {
    
    const result = await verifyAddUser({
      data: { user, password, email, questions },
    });
    if (!result.success) return result.error;

    return result.data;
    // const result = await usersModel.addUser({ user, password, email })

    // return result
  };

  static seeUser = async ({ user }) => {
    const result = await usersModel.seeUser({ user });

    if (!result) return { error: "No existe el usuario" };
    return result;
  };
}

export default users;
