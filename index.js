import express from "express";
import path from "path";
import { sequelize } from "./libs/db.js";
import { createProductos, getProductos } from "./controllers/productosController.js";
import { createCategorias, deleteCategorias, getCategorias } from "./controllers/categoriasController.js";

const PORT = process.env.PORT || 3000;

try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("Base de datos conectada con exito ✅");
} catch (error) {
  console.error("Error en la base de datos:", error);
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  res.sendFile("./public/index.html", { root: path.resolve() });
});

app.get("/productos/all", async (req, res) => {
  await getProductos(req, res);
});

app.post("/categorias", async (req, res) => {
  await createCategorias(req, res);
});

app.delete("/categorias/:id", async (req, res) => {
  await deleteCategorias(req, res);
});

app.get("/categorias", async (req, res) => {
  await getCategorias(req, res);
});

app.post("/productos", async (req, res) => {
  await createProductos(req, res);
});

app.get("/productos", (req, res) => {
  res.sendFile("./public/productos.html", { root: path.resolve() });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
