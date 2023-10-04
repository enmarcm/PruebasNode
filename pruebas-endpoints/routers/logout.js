import { Router } from "express";
import iSession from "../sessions/iSession.js";
const logoutRouter = Router()

logoutRouter.post("/", (req, res) => {
    console.log(req.session)
    if(!iSession.sessionExist(req)) return res.send("No tiene una sesion iniciada")

    iSession.destroySession(req)
    return res.send("Se cerro la sesion")
})

export default logoutRouter