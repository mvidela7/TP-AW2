import { renderizarProductos } from "./renderProductos.js";

const contenedor = document.getElementById("contenedor-productos");

const URL_API = "https://6aada288a2413bf0ec11b843.mockapi.io/productos";

if (contenedor) {

    fetch(URL_API)
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