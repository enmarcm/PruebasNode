import iPgHandler from '../data/pg-handler-data/iPgHandler.js'

class PermissionModel{
    static obtenerPermisos = async () => {
        const result = await iPgHandler.executeQuery({ key: 'obtenerPermisos' })
        return result
    }
}

export default PermissionModel