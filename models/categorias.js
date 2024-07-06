import { DataTypes } from "sequelize";
import { sequelize } from "../libs/db.js";

export const Categorias = sequelize.define(
  "categorias",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

