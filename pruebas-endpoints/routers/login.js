import { Router } from "express";
import LoginController from "../controllers/loginController.js";
const loginRouter = Router()

loginRouter.get("/", (req, res) => { 
    res.send("login")
})

loginRouter.post("/", LoginController.loginPost)

export default loginRouter