import importJSON from "../utils/importJson.js";
import PermissionController from "./permissionController.js";
import Security from "../components/Security.js";

const configSecurity = importJSON({path: '../data/security-data/config-security.json'})
const iSecurity = new Security({ controller: PermissionController, config: configSecurity})

class ToProcessController {
  static toProcessPost = async (req, res) => {
    const { user, profile } = req.session;

    const { area, method, object, params } = req.body;

    const permiso = await iSecurity.hasPermission({
      profile,
      area,
      object,
      method,
    });

    if (permiso) {
      const resultMethod = await iSecurity.executeMethod({
        area,
        object,
        method,
        params,
      });

      res.send(resultMethod);
    } else {
      res.send("jaja no puedes ejecutar");
    }
  };
}

export default ToProcessController;