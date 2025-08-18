import { sequelize } from "../config/database.js"; 
import { DataTypes } from "sequelize";


export const Product = sequelize.define('Product', {
 id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
 },
 name:{
   type: DataTypes.STRING(100),
   allowNull: false
 },
 precio:{
    type: DataTypes.FLOAT,
    allowNull: false
 },
 stock:{
    type: DataTypes.BOOLEAN,
    defaultValue: true,
 },
   description:{
    type: DataTypes.STRING(100),
    allowNull: false
 },
});