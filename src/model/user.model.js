import { sequelize } from "../config/database.js"; 
import { DataTypes } from "sequelize";


export const User = sequelize.define('User', {
 id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
 },
 name:{
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
 }
},{
  timestamps: false
});

//definicion de relaciones
