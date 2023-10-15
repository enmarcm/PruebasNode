/**
 * @file Archivo principal de la aplicación.
 * @description Este archivo inicia el servidor y configura los middlewares y routers, ejecutando el SessionComponent y el Security Component.
 * @author Enmanuel Colina <theenmanuel123@gmail.com>
 */

import express from "express";
import picocolors from "picocolors";
import iSession from "./data/session-data/iSession.js";
import { loginRouter, toProcessRouter, logoutRouter } from "./routers/dispatcher.js";
import { midCors, midNotFound , midAuthLogin} from "./middlewares/middlewares.js";

/**
 * Puerto en el que se iniciará el servidor.
 * @type {number}
 */
const PORT = process.env.PORT ?? 7878;

/**
 * Instancia de la aplicación Express.
 * @type {express.Application}
 */
const app = express();

// Configuración de middlewares y routers.
app.use(express.json());
app.use(midCors);
app.use(iSession.loadSession);
app.use("/login", midAuthLogin, loginRouter);
app.use(iSession.midSessionExist);
app.use("/toProcess", toProcessRouter);
app.use("/logout", logoutRouter);
app.use(midNotFound);

/**
 * Función que se ejecuta cuando el servidor está escuchando en el puerto especificado.
 * @function
 * @returns {void}
 */
const listenServer = () =>
  console.log(
    picocolors.bgWhite(
      picocolors.black(`El servidor esta iniciado en el PUERTO ${PORT}...`)
    )
  );

// Inicio del servidor
app.listen(PORT, listenServer);
