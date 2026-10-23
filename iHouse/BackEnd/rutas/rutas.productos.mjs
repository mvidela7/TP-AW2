import express from "express";
import controlador from "../modulos/productos/controlador.producto.mjs";

const rutasProductos = express.Router();

rutasProductos.get("/productos", controlador.obtenerProductos);
rutasProductos.get("/productos/:id", controlador.obtenerProducto);
rutasProductos.post("/productos", controlador.crearProducto);
rutasProductos.put("/productos/:id", controlador.actualizarProducto);
rutasProductos.delete("/productos/:id", controlador.eliminarProducto);

export default rutasProductos;
