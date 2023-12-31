/**
 * @file app.js the main file
 * @author Enmanuel Colina <theenmanuel123@gmail.com>
 * @see {@link https://github.com/enmarcm}
 */

import express from "express";
import midCors from "./middlewares/cors.js";
import midNotFound from "./middlewares/notFound.js";
import midAuthUser from "./middlewares/midAuthUser.js";
import loginRouter from "./routers/login.js";
import logoutRouter from "./routers/logout.js";
import contentRouter from "./routers/content.js";
import desbloqueoRouter from "./routers/desbloquear.js"
import iSession from "./sessions/iSession.js";
const PORT = process.env.PORT ?? 7878;

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(midCors);

//*Aqui no necesito sesion, para probar solo quiero desbloquearlo (PARA PRUEBAS, PREGUNTAR COMO SE HACE)
app.use("/desbloquear", desbloqueoRouter)

app.use(iSession.loadSession);

app.use("/login", midAuthUser, loginRouter);

app.use(iSession.midSessionExist);
app.use("/logout", logoutRouter);
app.use("/content", contentRouter)

//TODO:
// app.use("/olvidoDatos", olvidoDatosRouter)
// app.use("/solicitarPreguntas", solicitarPreguntasRouter)
// app.use("/enviarPreguntas", enviarPreguntasRouter)

app.use(midNotFound);
app.listen(PORT, () => console.log(`Esperando en el puerto ${PORT}`));
