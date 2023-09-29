import { Router } from "express";
import MAP_SESSIONS from "../utils/mapSessions.js";
const logoutRouter = Router()

logoutRouter.post("/", (req, res) => {
    const {sessionID, session} = req.body
    if(!session || !sessionID) return res.send("No tiene una sesion iniciada")

    req.session.destroy()
    MAP_SESSIONS.delete(sessionID)
    return res.send("Se cerro la sesion")
})

export default logoutRouter