import { verifyAddUser } from "../../../schemas/userSchema.js";
import usersModel from "../../../models/BO/usersModel.js";
class users {
  addUser = async ({ user, password, email, questions, profiles }) => {
    
    const schema = await verifyAddUser({
      data: { user, password, email, questions, profiles },
    });
    if (!schema.success) return schema.error;

    const result = await usersModel.addUser({ user, password, email, questions, profiles })

    if(result.severity === 'ERROR') return {error: "Ocurrio un error al crear el usuario"}
    return {message: "Usuario creado correctamente"}
  };

  static seeUser = async ({ user }) => {
    const result = await usersModel.seeUser({ user });

    if (!result) return { error: "No existe el usuario" };
    return result;
  };
}

export default users;
