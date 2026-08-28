import { renderizarProductos } from "./renderProductos.js";

const contenedor = document.getElementById("contenedor-productos");

if (contenedor) {

    fetch("./recursos/json/productos.json")
        .then(respuesta => {

            if (!respuesta.ok) {
                throw new Error("No se pudo cargar el archivo JSON");
            }

            return respuesta.json();
        })
        .then(productos => {

            renderizarProductos(productos);

        })
        .catch(error => {

            console.error("Error al cargar los productos:", error);

            contenedor.innerHTML = `
                <p>
                    No se pudieron cargar los productos.
                    Intente nuevamente más tarde.
                </p>
            `;
        });
}