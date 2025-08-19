import { sequelize } from "../config/database.js"; 
import { DataTypes } from "sequelize";
import { Task } from "./task.model.js";


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
},{
  timestamps: false
});

//definicion de relaciones
//1 trabajador tiene muchas tareas
Worker.hasMany(Task,{foreignKey: 'worker_id'})
//1 tarea pertenece a un trabajador
Task.belongsTo(Worker, {foreignKey: 'worker_id'});
//con esto tmbn valido q no se puedan asignar tareas a 
//trabajadores q no esten activos(existan:P)