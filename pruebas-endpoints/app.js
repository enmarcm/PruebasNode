import express from "express";
import midCors from "./middlewares/cors.js";
import midNotFound from "./middlewares/notFound.js";
import { midAuthUser } from "./middlewares/midAuthUser.js";
import loginRouter from "./routers/login.js";
import logoutRouter from "./routers/logout.js";
import iSession from "./sessions/iSession.js";
const PORT = process.env.PORT ?? 7878;

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(midCors);

app.use(iSession.loadSession);
app.use("/login", midAuthUser, loginRouter);

app.use(iSession.midSessionExist)
app.use("/logout", logoutRouter);
app.get("/content", (req, res) => {
    console.log(req.session)
    res.json({ content: "contenido" })
});

//TODO:
// app.use("/olvidoDatos", olvidoDatosRouter)
// app.use("/solicitarPreguntas", solicitarPreguntasRouter)
// app.use("/enviarPreguntas", enviarPreguntasRouter)

app.use(midNotFound);
app.listen(PORT, () => console.log(`Esperando en el puerto ${PORT}`));
