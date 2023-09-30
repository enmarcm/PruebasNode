import session from "express-session";
import { Router } from "express";
import LoginController from "../controllers/loginController.js";
const loginRouter = Router()

// loginRouter.use(session({
//     secret: "loginSession",
//     saveUninitialized: true,
//     resave: false   
// }))

loginRouter.get("/", (req, res) => { 
    res.send("login")
})

loginRouter.post("/", LoginController.loginPost)

export default loginRouter