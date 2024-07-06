import { Productos } from "../models/productos.js";
import crypto from "crypto";
import { Categorias } from "../models/categorias.js";

export async function createProductos(req, res) {
  const { codigo, nombre, precio, categoria_id, existencia_actual } = req.body;

  if (!nombre || !precio || !categoria_id || !existencia_actual) {
    return res.status(400).send("Todos los campos son obligatorios");
  }

  try {
    const newCodigo = crypto.randomBytes(3).toString("hex");

    const createProducto = await Productos.create({
      codigo: newCodigo,
      nombre,
      precio,
      categoria_id,
      existencia_actual,
    });

    const newProducto = await Productos.findOne({
      where: { id: createProducto.id },
      include: [{ model: Categorias }],
    });

    res.status(201).send(newProducto);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getProductos(req, res) {
  try {
    const productos = await Productos.findAll({
      include: [{ model: Categorias }],
    });

    res.send(productos);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getProductosById(req, res) {
  const { id } = req.params;
  try {
    const producto = await Productos.findByPk(id);
    if (!producto) {
      return res.status(404).send("El producto no existe");
    }
    res.send(producto);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateProductos(req, res) {
  const { id } = req.params;
  const { codigo, nombre, precio, categoria_id, existencia_actual } = req.body;
  try {
    const producto = await Productos.findByPk(id);
    if (!producto) {
      return res.status(404).send("El producto no existe");
    }
    await Productos.update(
      {
        codigo,
        nombre,
        precio,
        categoria_id,
        existencia_actual,
      },
      {
        where: {
          id,
        },
      }
    );
    res.send("Producto actualizado con exito");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function deleteProductos(req, res) {
  const { id } = req.params;
  try {
    const producto = await Productos.findByPk(id);
    if (!producto) {
      return res.status(404).send("El producto no existe");
    }
    await Productos.destroy({
      where: {
        id,
      },
    });
    res.send("Producto eliminado con exito");
  } catch (error) {
    res.status(500).send(error);
  }
}
