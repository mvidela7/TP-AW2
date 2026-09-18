import productos from "./api/productos.mjs";
import express from "express";
const app = express();
const PUERTO = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Publicar el FrontEnd
app.use(express.static("../FrontEnd"));

// Rutas
app.get("/catalogo", (req, res) => {
    res.redirect("/catalogo.html");
});

app.get("/contacto", (req, res) => {
    res.redirect("/contacto.html");
});

// API de productos
app.get("/api/productos", (req, res) => {
    res.json(productos);
});

// Servidor
app.listen(PUERTO, () => {
    console.log(`Servidor iniciado en http://localhost:${PUERTO}`);
});