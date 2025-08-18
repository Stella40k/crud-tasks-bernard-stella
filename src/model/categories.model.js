import { sequelize } from "../config/database.js"; 
import { DataTypes } from "sequelize";


export const Worker = sequelize.define('Worker', {
 id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
 },
 name:{
   type: DataTypes.STRING(100),
   allowNull: false
 },
  description:{
    type: DataTypes.STRING(100),
    allowNull: false
 },
 stock:{
   type: DataTypes.BOOLEAN,
   defaultValue: true,
 }
});