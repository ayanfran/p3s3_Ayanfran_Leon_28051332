import express from "express";
import path from "path";

const PORT = process.env.PORT || 4000;

const app = express();

app.get("/", (req, res) => {
  res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  res.sendFile("./public/index.html", { root: path.resolve() });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
