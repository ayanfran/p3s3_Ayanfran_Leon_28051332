import { DataTypes } from "sequelize";
import { sequelize } from "../libs/db.js";
import { Categorias } from "./categorias.js";

export const Productos = sequelize.define(
  "productos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    precio: {
      type: DataTypes.DECIMAL,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "categorias",
        key: "id",
      },
    },
    existencia_actual: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
  }
);

Productos.belongsTo(Categorias, { foreignKey: "categoria_id", constraints: false });
Categorias.hasMany(Productos, { foreignKey: "categoria_id" });
