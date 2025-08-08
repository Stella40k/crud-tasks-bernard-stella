import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("conexion a la bd");
    

  } catch (error) {
    console.error("error en la conexion:", error);
  }
};
