
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
        const { nombre, precio, imagen } = req.body;

        if (!nombre || precio === undefined || precio === null) {
            return res.status(400).json({ mensaje: "Nombre y precio son obligatorios" });
        }

        const producto = await modelo.crearProducto({
            nombre,
            precio,
            imagen: imagen || ""
        });

        res.status(201).json(producto);
      } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ mensaje: "Error al crear el producto" });
    }
};

const actualizarProducto = async (req, res) => {
    try {
        const { nombre, precio, imagen } = req.body;

        if (!nombre || precio === undefined || precio === null) {
            return res.status(400).json({ mensaje: "Nombre y precio son obligatorios" });
        }

        const producto = await modelo.actualizarProducto(req.params.id, {
            nombre,
            precio,
            imagen: imagen || ""
        });

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el producto" });
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
