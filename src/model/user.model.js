import { sequelize } from "/config/database.js"; 
import { DataTypes } from "sequelize";


export const user = sequelize.define('User', {
 id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
 },
 name:{

 },
 email:{

 },
 password:{

 }
});