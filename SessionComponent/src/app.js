import express from "express";
import picocolors from "picocolors";

const PORT = process.env.PORT ?? 7878;
const app = express();
app.use(express.json());

const listenServer = () =>
  console.log(
    picocolors.bgWhite(
      picocolors.black(`El servidor esta iniciado en el PUERTO ${PORT}...`)
    )
  );
app.listen(PORT, listenServer);
