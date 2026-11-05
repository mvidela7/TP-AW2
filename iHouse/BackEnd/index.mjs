import pool from "./conexion.bd.mjs";
import express from "express";
import rutas from "./rutas/rutas.principal.mjs";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.mjs";

const app = express();
const PUERTO = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Servir archivos estáticos del Front-End
app.use(express.static("../FrontEnd"));

// Rutas de productos
app.use("/api", rutas);

// Servidor
app.listen(PUERTO, () => {
    console.log(`Servidor iniciado en http://localhost:${PUERTO}`);
});