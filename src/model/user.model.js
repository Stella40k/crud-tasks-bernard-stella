import { sequelize } from "../config/database.js"; 
import { DataTypes } from "sequelize";
import { Order } from "./orders.model.js";

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

User.hasMany(Order, {foreignKey: 'userId'});
//un pedido pertnece a un usuario
Order.belongsTo(User, {foreignKey: 'userId'});  
//un usuario tiene muchas pedidos