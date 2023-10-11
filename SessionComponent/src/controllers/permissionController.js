import PermissionModel from "../models/permissionModel.js";

class PermissionControler {
  static obtenerPermisos = async () => {
    const result = await PermissionModel.obtenerPermisos();
    return result;
  };
}

export default PermissionControler;
