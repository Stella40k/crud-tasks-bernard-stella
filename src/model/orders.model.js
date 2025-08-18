import { sequelize } from "../config/database.js"; 
import { DataTypes } from "sequelize";


export const Order = sequelize.define('Order', {
 id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
 },
 fecha:{
    type: DataTypes.DATE,
    type: DataTypes.NOW
 },
 estado:{
    type: DataTypes.ENUM("pendiente", "enviado", "entregado"),
    allowNull: false
 }
});