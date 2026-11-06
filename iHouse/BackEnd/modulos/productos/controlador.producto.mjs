
import modelo from "./modelo.producto.mjs";

const obtenerProductos = async (req, res) => {
    try {
        const productos = await modelo.obtenerProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los productos" });
    }
};

const obtenerProducto = async (req, res) => {
    try {
        const producto = await modelo.obtenerProducto(req.params.id);

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el producto" });
    }
};

const crearProducto = async (req, res) => {
    try {
        const { nombre, precio } = req.body;

        if (!nombre || precio === undefined || precio === null || precio === "") {
            return res.status(400).json({
                mensaje: "Nombre y precio son obligatorios"
            });
        }

        // Guardamos la ruta relativa de la imagen
        const imagen = req.file
            ? `productos/${req.file.filename}`
            : "";

        const producto = await modelo.crearProducto({
            nombre,
            precio,
            imagen
        });

        res.status(201).json(producto);

    } catch (error) {
        console.error("Error al crear el producto:", error);

        res.status(500).json({
            mensaje: "Error al crear el producto"
        });
    }
};

const actualizarProducto = async (req, res) => {
    try {
        const { nombre, precio } = req.body;

        if (!nombre || precio === undefined || precio === null || precio === "") {
            return res.status(400).json({
                mensaje: "Nombre y precio son obligatorios"
            });
        }

        const productoExistente = await modelo.obtenerProducto(req.params.id);

        if (!productoExistente) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        // Si no se selecciona una imagen nueva, conserva la anterior
        const imagen = req.file
            ? `productos/${req.file.filename}`
            : productoExistente.imagen;

        const producto = await modelo.actualizarProducto(req.params.id, {
            nombre,
            precio,
            imagen
        });

        res.json(producto);

    } catch (error) {
        console.error("Error al actualizar el producto:", error);

        res.status(500).json({
            mensaje: "Error al actualizar el producto"
        });
    }
};

const eliminarProducto = async (req, res) => {
    try {
        const producto = await modelo.eliminarProducto(req.params.id);

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.json({ mensaje: "Producto eliminado", producto });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el producto" });
    }
};

export default {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
