
const API = "/api/productos";

const formulario = document.getElementById("formProducto");
const listaProductos = document.getElementById("listaProductos");
const mensaje = document.getElementById("mensaje");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");

let productos = [];

const cargarProductos = async () => {
    try {
        const respuesta = await fetch(API);

        if (!respuesta.ok) {
            throw new Error("No se pudieron cargar los productos");
        }

        productos = await respuesta.json();
        mostrarProductos();
    } catch (error) {
        mensaje.textContent = "Error al cargar los productos";
    }
};

const mostrarProductos = () => {
    listaProductos.innerHTML = "";

    productos.forEach(producto => {
        const fila = document.createElement("tr");

        const datos = [
            producto.id,
            producto.producto,
            `$${producto.precio}`,
            producto.imagen || ""
        ];
     
        datos.forEach((dato, indice) => {
    const celda = document.createElement("td");

    if (indice === 3 && dato) {
        const enlace = document.createElement("a");
        enlace.href = dato;
        enlace.target = "_blank";
        enlace.rel = "noopener noreferrer";
        enlace.textContent = "Ver imagen";
        celda.appendChild(enlace);
    } else {
        celda.textContent = dato;
    }

    fila.appendChild(celda);
});

        const acciones = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", () => editarProducto(producto.id));

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => eliminarProducto(producto.id));

        acciones.append(btnEditar, btnEliminar);
        fila.appendChild(acciones);
        listaProductos.appendChild(fila);
    });
};

const editarProducto = (id) => {
    const producto = productos.find(p => p.id === id);

    if (!producto) return;

    document.getElementById("idProducto").value = producto.id;
    document.getElementById("nombre").value = producto.producto;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("imagen").value = producto.imagen || "";

    btnGuardar.textContent = "Guardar cambios";
    btnCancelar.hidden = false;
};

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const id = document.getElementById("idProducto").value;

    const producto = {
        nombre: document.getElementById("nombre").value.trim(),
        precio: Number(document.getElementById("precio").value),
        imagen: document.getElementById("imagen").value.trim()
    };

    try {
        const respuesta = await fetch(id ? `${API}/${id}` : API, {
            method: id ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(resultado.mensaje || "No se pudo guardar el producto");
        }

        mensaje.textContent = id ? "Producto actualizado" : "Producto agregado";

        formulario.reset();
        document.getElementById("idProducto").value = "";
        btnGuardar.textContent = "Agregar producto";
        btnCancelar.hidden = true;

        await cargarProductos();
    } catch (error) {
        mensaje.textContent = error.message;
    }
});

const eliminarProducto = async (id) => {
    if (!confirm("¿Seguro que querés eliminar este producto?")) return;

    try {
        const respuesta = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(resultado.mensaje || "No se pudo eliminar");
        }

        mensaje.textContent = "Producto eliminado";
        await cargarProductos();
    } catch (error) {
        mensaje.textContent = error.message;
    }
};

btnCancelar.addEventListener("click", () => {
    formulario.reset();
    document.getElementById("idProducto").value = "";
    btnGuardar.textContent = "Agregar producto";
    btnCancelar.hidden = true;
});

cargarProductos();
