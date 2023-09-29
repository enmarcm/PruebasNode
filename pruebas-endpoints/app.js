import express from "express";
import midCors from "./middlewares/cors.js";
import midNotFound from "./middlewares/notFound.js";
import loginRouter from "./routers/login.js";
const PORT = process.env.PORT ?? 7878;

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(midCors);

app.use("/login", loginRouter);

app.use(midNotFound);
app.listen(PORT, () => console.log(`Esperando en el puerto ${PORT}`));
