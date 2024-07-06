import { Categorias } from "../models/categorias.js";

export async function createCategorias(req, res) {
  console.log(req.body);
  const { nombre } = req.body;
  try {
    await Categorias.create({
      nombre,
    });
    res.status(201).send("Categoría creada con éxito");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getCategorias(req, res) {
  try {
    const categorias = await Categorias.findAll();
    res.send(categorias);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateCategorias(req, res) {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const categoria = await Categorias.findByPk(id);
    if (!categoria) {
      return res.status(404).send("La categoría no existe");
    }
    await Categorias.update(
      {
        nombre,
      },
      {
        where: {
          id,
        },
      }
    );
    res.send("Categoría actualizada con éxito");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function deleteCategorias(req, res) {
  const { id } = req.params;
  try {
    const categoria = await Categorias.findByPk(id);
    if (!categoria) {
      return res.status(404).send("La categoría no existe");
    }
    await Categorias.destroy({
      where: {
        id,
      },
    });
    res.send("Categoría eliminada con éxito");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getCategoriasById(req, res) {
  const { id } = req.params;
  try {
    const categoria = await Categorias.findByPk(id);
    if (!categoria) {
      return res.status(404).send("La categoría no existe");
    }
    res.send(categoria);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateCategoriasById(req, res) {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const categoria = await Categorias.findByPk(id);
    if (!categoria) {
      return res.status(404).send("La categoría no existe");
    }
    await Categorias.update(
      {
        nombre,
      },
      {
        where: {
          id,
        },
      }
    );
    res.send("Categoría actualizada con éxito");
  } catch (error) {
    res.status(500).send(error);
  }
}
