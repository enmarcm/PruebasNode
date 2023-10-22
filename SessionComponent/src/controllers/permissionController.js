import UserModel from "../models/userModel.js";

class PermissionController {
  static executeMethod = async ({ method, params }) => {
    //Importante, los params deben estar ordenados, tal cual como estan en el archivo de querys para que funcione

    try {
      const result = await UserModel.executeMethod({ method, params });
      return result;
    } catch (error) {
      return { error };
    }
  };
}

export default PermissionController;
