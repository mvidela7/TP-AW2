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
app.get("/api/productos", async (req, res) => {
    try {
        const respuesta = await fetch(
            "https://6aada288a2413bf0ec11b843.mockapi.io/productos"
        );

        if (!respuesta.ok) {
            throw new Error("Error al obtener los productos de MockAPI");
        }

        const productos = await respuesta.json();

        res.json(productos);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: "No se pudieron obtener los productos"
        });
    }
});

// Servidor
app.listen(PUERTO, () => {
    console.log(`Servidor iniciado en http://localhost:${PUERTO}`);
});