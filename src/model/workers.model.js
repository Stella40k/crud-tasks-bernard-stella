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
 last_name:{
    type: DataTypes.STRING(100),
    allowNull: false
 },
 email:{
   type: DataTypes.STRING(100),
   unique: true,
   allowNull: false
 },
 password:{
   type: DataTypes.STRING(100),
   allowNull: false
 }, 
 rol:{
    type: DataTypes.ENUM("cajero", "administrador", "limpieza", "repositor"),
    allowNull: false,
 },
 activo:{
  type: DataTypes.BOOLEAN,
  defaultValue: true
 }
});