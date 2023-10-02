import express from "express";
import midCors from "./middlewares/cors.js";
import midNotFound from "./middlewares/notFound.js";
import loginRouter from "./routers/login.js";
import logoutRouter from "./routers/logout.js"
import session from "express-session";
const PORT = process.env.PORT ?? 7878;

const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.use(midCors);

console.log(session.Session)

app.use("/login", loginRouter)
app.use("/logout", logoutRouter)
// app.use("/olvidoDatos", olvidoDatosRouter)
// app.use("/solicitarPreguntas", solicitarPreguntasRouter)
// app.use("/enviarPreguntas", enviarPreguntasRouter)

app.use(midNotFound);
app.listen(PORT, () => console.log(`Esperando en el puerto ${PORT}`));
