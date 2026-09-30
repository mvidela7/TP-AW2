import { renderizarProductos } from "./renderProductos.js";

const contenedor = document.getElementById("contenedor-productos");

const URL_API = "/api/productos";

if (contenedor) {

    fetch("/api/productos")
        .then(respuesta => {

            if (!respuesta.ok) {
                throw new Error("Error al obtener los productos");
            }

            return respuesta.json();

        })
        .then(productos => {

            console.log(productos); // ← para probar

            renderizarProductos(productos);

        })
        .catch(error => {

            console.error("ERROR:", error);

            contenedor.innerHTML = `
                <p>No se pudieron cargar los productos.</p>
            `;

        });

}