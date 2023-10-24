import iSecurity from "../data/security-data/iSecurity.js";

/**
 * Clase que representa un controlador para ejecutar métodos de diferentes áreas y objetos.
 */
class ToProcessController {
  /**
   * Ejecuta un método de un objeto de una determinada área.
   * @async
   * @param {Object} req - El objeto de solicitud.
   * @param {Object} res - El objeto de respuesta.
   * @returns {Promise<Object>} El objeto JSON con el resultado de la ejecución del método o un mensaje de error.
   */
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
        res.json({ error: "No tienes permiso para ejecutar este método" });
      }
    } catch (error) {
      return { error };
    }
  };
}

export default ToProcessController;