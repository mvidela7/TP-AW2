import pool from "./conexion.bd.mjs";
import express from "express";
import rutas from "./rutas/rutas.principal.mjs";

const app = express();
const PUERTO = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Publicar el FrontEnd
app.use(express.static("../FrontEnd"));

// Rutas para navegar entre páginas
app.get("/catalogo", (req, res) => {
    res.redirect("/catalogo.html");
});

app.get("/contacto", (req, res) => {
    res.redirect("/contacto.html");
});

// Rutas de productos
app.use("/api", rutas);


app.get("/api/prueba-bd", async (req, res) => {
    const resultado = await pool.query("SELECT * FROM productos");
    res.json(resultado.rows);
});

// Servidor
app.listen(PUERTO, () => {
    console.log(`Servidor iniciado en http://localhost:${PUERTO}`);
});
