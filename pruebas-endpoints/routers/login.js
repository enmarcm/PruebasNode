import { Router } from "express";
const loginRouter = Router()

loginRouter.get("/", (req, res) => { 
    res.send("login")
})

loginRouter.post("/", (req, res) => {
    if(req.sessionID) return res.status(400).send("Ya estas logueado")
    const { user, password } = req.body
    
    const userExist = `` //TODO: Aqui hay que hacer una consulta para ver si existe o no
    if (!userExist) return res.status(404).send("El usuario no existe") 
    
    const passwordCorrect = `` //TODO: Aqui la consulta para ver si la contraseña es correcta
    if (!passwordCorrect) {
        disminuyeIntentos(user) //TODO: Aqui hay que hacer una funcion que disminuya los intentos de login
        return res.status(400).send("Contraseña incorrecta")
    }

    const usuarioBloqueado = `` //TODO: COnsulta para saber si es usuario esta bloqueado
    if (usuarioBloqueado) return res.status(400).send("Usuario bloqueado")
    
    restauraIntentos(user) //TODO: Aqui hay que hacer una funcion que restaure los intentos de login
    const datosUser = `` //TODO: Funcion para retornar los datos del usuario
    //ARRIBA IRIA const {user, rol, email, admin}

    req.sessionID = //TODO: GENERAR SESSIONID
    req.session = {
        user,
        rol,
        email, 
        admin
    }
})

export default loginRouter