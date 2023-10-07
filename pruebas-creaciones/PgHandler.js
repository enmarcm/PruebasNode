import Pool from "pg-pool";
class PgHandler{
    constructor({ config, querys }) {
        this.config = config;
        this.querys = querys;
        this.pool = new Pool(this.config);
    }

    executeQuery = async ({ key, params = [] }) => {
        try {
            const query = this.querys[key];
            const {rows} = await this.pool.query(query, params)
            return rows
        } catch (error) {
            return error
        }
     }
    
    //TODO: Implementar metodo para directamente ejecutar una transaction
    connect = async () => await this.pool.connect()

    release = async () => await this.pool.release()

}

export default PgHandler;