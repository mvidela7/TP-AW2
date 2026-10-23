
import pool from "../../conexion.bd.mjs";

const obtenerProductos = async () => {
    const resultado = await pool.query(
        "SELECT * FROM productos ORDER BY id"
    );

    return resultado.rows;
};

const obtenerProducto = async (id) => {
    const resultado = await pool.query(
        "SELECT * FROM productos WHERE id = $1",
        [id]
    );

    return resultado.rows[0];
};

const crearProducto = async (producto) => {
    const { nombre, precio, imagen } = producto;

    const resultado = await pool.query(
        "INSERT INTO productos (producto, precio, imagen) VALUES ($1, $2, $3) RETURNING *",
        [nombre, precio, imagen]
    );

    return resultado.rows[0];
};

const actualizarProducto = async (id, producto) => {
    const { nombre, precio, imagen } = producto;

    const resultado = await pool.query(
        "UPDATE productos SET producto = $1, precio = $2, imagen = $3 WHERE id = $4 RETURNING *",
        [nombre, precio, imagen, id]
    );

    return resultado.rows[0];
};

const eliminarProducto = async (id) => {
    const resultado = await pool.query(
        "DELETE FROM productos WHERE id = $1 RETURNING *",
        [id]
    );

    return resultado.rows[0];
};

export default {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
