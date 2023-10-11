import usersModel from "../../../models/BO/usersModel.js"
class users{
    addUser = async({ user, password, email }) => {
        //TODO: Hay que hacer codigo que valide si las cadenas ingresadas son validas, usar ZOD

        const result = await usersModel.addUser({ user, password, email })

        return result
    }

    static seeUser = async( user ) => {
        const result = await usersModel.seeUser({ user })

        if(!result) return { error: 'No existe el usuario'}
        return result
    }
}

export default users