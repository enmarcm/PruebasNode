import iSecurity from "../data/security-data/iSecurity.js";

class ToProcessController {
  static toProcessPost = async (req, res) => {
    try {
      const { profile } = req.session;

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

        res.json(resultMethod);
      } else {
        res.json({ error: "No tienes permiso para ejecutar este metodo" });
      }
    } catch (error) {
      return { error };
    }
  };
}

export default ToProcessController;
