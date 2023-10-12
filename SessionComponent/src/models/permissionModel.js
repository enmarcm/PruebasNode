import iPgHandler from '../data/pg-handler-data/iPgHandler.js'

class PermissionModel{
    static obtenerPermisos = async () => {
        const result = await iPgHandler.executeQuery({ key: 'obtenerPermisos' })
        return result
    }
    static verifyMethod = async ({ area, object, method }) => {
        const result = await iPgHandler.executeQuery({ key: 'verifyMethod', params: [area, object, method] })
        return result
    }

    static verifyProfile = async({ profile })=>{
        const result = await iPgHandler.executeQuery({ key: 'verifyProfile', params: [profile] })
        return result
    }

    static removePermission = async ({ idProfile, idMethod }) => { 
        const result = await iPgHandler.executeQuery({key: 'removePermission', params: [idProfile, idMethod]})
        return result
    }

    static addPermission = async ({ idProfile, idMethod }) => { 
        const result = await iPgHandler.executeQuery({key: 'addPermission', params: [idProfile, idMethod]})
        return result
    }
}

export default PermissionModel