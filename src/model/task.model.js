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
 is_complete:{
   type: DataTypes.BOOLEAN,
   defaultValue: false,
 }
},{
   timestamps: false
});
//separar con _ las palabras en la base de datos
//TaskModel.belongTo(UserModel)
//User

//definicion de relaciones
//preguntar al profe pq esta bien q no tenga rerlaciones con otros modelos
//el pq esta bien q las relaciones esten definidas en otros modelos y no en este