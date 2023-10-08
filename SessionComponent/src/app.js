import express from "express";
import picocolors from "picocolors";
import iSession from "./data/session-data/iSession.js";
import LoginController from "./controllers/loginController.js";
import loginRouter from "./routers/loginRouter.js";

const PORT = process.env.PORT ?? 7878;
const app = express();
app.use(express.json());
app.use(iSession.loadSession)

app.use('/login',  loginRouter)

const listenServer = () => console.log(picocolors.bgWhite(picocolors.black(`El servidor esta iniciado en el PUERTO ${PORT}...`)));

app.listen(PORT, listenServer);