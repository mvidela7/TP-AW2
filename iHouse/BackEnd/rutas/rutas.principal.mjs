
import express from "express";
import rutasProductos from "./rutas.productos.mjs";

const rutas = express.Router();

rutas.use(rutasProductos);

export default rutas;
