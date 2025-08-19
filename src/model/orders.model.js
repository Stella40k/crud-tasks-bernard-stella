import { sequelize } from "../config/database.js"; 
import { DataTypes } from "sequelize";
import { User } from "./user.model.js";

export const Order = sequelize.define('Order', {
 id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
 },
 fecha:{
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
 },
 estado:{
    type: DataTypes.ENUM("pendiente", "enviado", "entregado"),
    allowNull: false,
    defaultValue: "pendiente"
 }
},{
    timestamps: false
});

//definicion de relaciones
//un pedido pertnece a un usuario
//Order.belongsTo(User, {foreignKey: 'userId'});
//un usuario puede pedir/tener muchas ordenes
//User.hasMany(Order, {foreignKey: 'userId'});