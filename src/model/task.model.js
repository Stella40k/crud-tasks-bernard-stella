import { sequelize } from "../config/database.js"; 
import { DataTypes } from "sequelize";


export const Task = sequelize.define('Task', {
 id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
 },
 title:{
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
 },
 description:{
    type: DataTypes.STRING(100),
    allowNull: false
 },
 isComplete:{
   type: DataTypes.BOOLEAN,
   toDefaultValue: false,
 }
});
//separar con _ las palabras en la base de datos
//TaskModel.belongTo(UserModel)
//User