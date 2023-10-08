import { Pool } from 'pg';

/**
 * Clase que maneja la conexión y ejecución de consultas a una base de datos PostgreSQL usando como base Pg-Pool.
 */
class PgHandler {
  /**
   * Crea una instancia de PgHandler.
   * @param {Object} options - Opciones para la configuración y consultas de la base de datos.
   * @param {Object} options.config - Configuración de la conexión a la base de datos.
   * @param {Object} options.querys - Consultas predefinidas para la base de datos, objeto o JSON.
   */
  constructor({ config, querys }) {
    /**
     * Configuración de la conexión a la base de datos.
     * @type {Object}
     */
    this.config = config;
    /**
     * Consultas predefinidas para la base de datos.
     * @type {Object}
     */
    this.querys = querys;
    /**
     * Pool de conexiones a la base de datos.
     * @type {Pool}
     */
    this.pool = new Pool(this.config);
  }

  /**
   * Ejecuta una consulta a la base de datos.
   * @async 
   * @param {Object} options - Opciones para la ejecución de la consulta.
   * @param {string} options.key - Clave de la consulta predefinida a ejecutar.
   * @param {Array} [options.params=[]] - Parámetros para la consulta.
   * @returns {Promise<Array|Error>} - Resultado de la consulta o un objeto Error si ocurre un error.
   */
  executeQuery = async ({ key, params = [] }) => {
    try {
      const query = this.querys[key];
      const { rows } = await this.pool.query(query, params);
      return rows;
    } catch (error) {
      return error;
    }
  };

  /**
   * Conecta a la base de datos.
   * @async
   * @returns {Promise<import('pg').Client>} - Cliente de la conexión a la base de datos.
   */
  connect = async () => await this.pool.connect();

  /**
   * Libera la conexión a la base de datos.
   * @async
   * @returns {Promise<void>}
   */
  release = async () => await this.pool.release();
}

export default PgHandler;