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

export const connect = async() => {
    try {
        await sequelize.sync({force: false})
        console.log("conectado a la base de datoss");
    } catch (error) {
        console.log("error al conectar con la bd", error);
    }
};
