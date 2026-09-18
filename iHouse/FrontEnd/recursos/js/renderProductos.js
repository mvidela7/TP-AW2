export function renderizarProductos(productos) {

    const contenedor = document.getElementById("contenedor-productos");

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = "";

    productos.forEach(producto => {

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-producto");

        let descuentoHTML = "";

        if (producto.descuento) {
            descuentoHTML = `
                <span class="descuento">
                    ${producto.descuento}
                </span>
            `;
        }

        tarjeta.innerHTML = `
            ${descuentoHTML}

            <img
                src="./recursos/imagenes/${producto.imagen}"
                alt="${producto.nombre}"
            >

            <h3>${producto.nombre}</h3>

            <p>${producto.descripcion}</p>

            <h4>$${producto.precio.toLocaleString("es-AR")}</h4>

            <span class="oferta">
                ${producto.oferta}
            </span>
        `;

        contenedor.appendChild(tarjeta);

    });

}