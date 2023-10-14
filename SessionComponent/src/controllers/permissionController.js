import PermissionModel from "../models/permissionModel.js";

class PermissionControler {
  // static obtenerPermisos = async () => {
  //   const result = await PermissionModel.obtenerPermisos();
  //   return result;
  // };

  // static verifyMethod = async ({area, object, method}) => {
  //   //Hacer que todo lo haga a tolowerCase

  //   const result = await PermissionModel.verifyMethod({area, object, method})
  //   return result
  // }

  // static verifyProfile = async ({ profile }) => await PermissionModel.verifyProfile({ profile })

  // static removePermission = async ({ idProfile, idMethod }) => await PermissionModel.removePermission({ idProfile, idMethod })

  // static addPermission = async ({ idProfile, idMethod }) => await PermissionModel.addPermission({ idProfile, idMethod })

  // static blockMethod = async ({ idMethod }) => await PermissionModel.blockMethod({ idMethod })

  // static blockProfile = async ({ idProfile }) => await PermissionModel.blockProfile({ idProfile })

  static executeMethod = async ({ method, params }) => {
    //Importante, los params deben estar ordenados, tal cual como estan en el archivo de querys para que funcione

    const result = await PermissionModel.executeMethod({ method, params });
    return result;
  };
}

export default PermissionControler;
