import iSecurity from "../data/security-data/iSecurity.js";

class ToProcessController {
  static toProcessPost = async (req, res) => {

    const { profile } = req.session;

    const { area, method, object, params} = req.body;

    const permiso = await iSecurity.hasPermission({
      profile,
      area,
      object,
      method
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
      res.send("No tienes permiso para ejecutar este metodo");
    }
  };
}

export default ToProcessController;
