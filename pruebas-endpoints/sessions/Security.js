class Security{
    constructor({BOPath, executerQuerys}) { }

    hasPermission = ({ req, method }) => {}
    executeMethod = ({method, area, params}) =>{}
    sendToClient = ({req, res}) =>{}
    setPermission = ({profile, area, method}) =>{}
}