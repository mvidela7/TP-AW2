
export function renderizarProductos(productos) {

    const contenedor = document.getElementById("contenedor-productos");

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = "";

    // Orden de los productos del catálogo
    const orden = [
        "iPhone 17",
        "iPhone 17 Pro",
        "iPhone 17 Pro Max",
        "iPhone 16",
        "iPhone 16e",
        "iPhone 16 Pro",
        "iPhone 16 Pro Max",
        "iPhone 15",
        "iPhone 15 Plus",
        "iPhone 15 Pro",
        "iPad Pro 11 pulgadas",
        "iPad Pro 13 pulgadas",
        "iPad Air 11 pulgadas",
        "iPad Air 13 pulgadas",
        "MacBook Air 13 pulgadas",
        "MacBook Air 15 pulgadas",
        "MacBook Pro 14 pulgadas",
        "MacBook Pro 16 pulgadas",
        "MacBook Neo"
    ];

    // Ordenar según la lista anterior
    const productosOrdenados = [...productos].sort((a, b) => {
        const posicionA = orden.indexOf(a.producto);
        const posicionB = orden.indexOf(b.producto);

        // Los productos que no estén en la lista van al final
        const ordenA = posicionA === -1 ? 999 : posicionA;
        const ordenB = posicionB === -1 ? 999 : posicionB;

        return ordenA - ordenB;
    });

    // Crear las tarjetas
    productosOrdenados.forEach(producto => {

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-producto");

        const nombre = producto.producto || "Producto Apple";
        const precio = Number(producto.precio) || 0;

        // Preparar la imagen
        const imagen = producto.imagen
            ? `./recursos/imagenes/${producto.imagen}`
            : "";

        tarjeta.innerHTML = `
            <img
                src="${imagen}"
                alt="${nombre}"
                loading="lazy"
            >

            <h3>${nombre}</h3>

            <p>${producto.descripcion || "Producto Apple"}</p>

            <h4>$${precio.toLocaleString("es-AR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</h4>

            <span class="oferta">
                ${producto.oferta || "Consultá las promociones"}
            </span>
        `;

        contenedor.appendChild(tarjeta);

    });

}

