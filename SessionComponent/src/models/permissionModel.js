import iPgHandler from '../data/pg-handler-data/iPgHandler.js'

class PermissionModel{
    // static obtenerPermisos = async () => {
    //     const result = await iPgHandler.executeQuery({ key: 'obtenerPermisos' })
    //     return result
    // }
    // static verifyMethod = async ({ area, object, method }) => {
    //     const result = await iPgHandler.executeQuery({ key: 'verifyMethod', params: [area, object, method] })
    //     return result
    // }

    // static verifyProfile = async({ profile })=>{
    //     const result = await iPgHandler.executeQuery({ key: 'verifyProfile', params: [profile] })
    //     return result
    // }

    // static removePermission = async ({ idProfile, idMethod }) => { 
    //     const result = await iPgHandler.executeQuery({key: 'removePermission', params: [idProfile, idMethod]})
    //     return result
    // }

    // static addPermission = async ({ idProfile, idMethod }) => { 
    //     const result = await iPgHandler.executeQuery({key: 'addPermission', params: [idProfile, idMethod]})
    //     return result
    // }

    // static blockMethod = async ({ idMethod }) => { 
    //     const result = await iPgHandler.executeQuery({key: 'blockMethod', params: [idMethod]})
    //     return result
    // }

    // static blockProfile = async ({ idProfile }) => { 
    //     const result = await iPgHandler.executeQuery({key: 'blockProfile', params: [idProfile]})
    //     return result
    // }

    static executeMethod = async ({ method, params }) => { 
        //Importante, los params deben estar ordenados, tal cual como estan en el archivo de querys para que funcione
        //El query debe llamarse igual al metodo para que funcione
        const parametros = []
        for (const key in params) {
            parametros.push(params[key])
        }
        const result = await iPgHandler.executeQuery({key: method, params: parametros})
        return result
    }
}

export default PermissionModel