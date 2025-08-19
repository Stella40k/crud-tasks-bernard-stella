import { sequelize } from "../config/database.js"; 
import { DataTypes } from "sequelize";
import { Product } from "./products.model.js";


export const Category = sequelize.define('Category', {
 id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
},
 name:{
   type: DataTypes.STRING(100),
   allowNull: false
},
  description:{
    type: DataTypes.STRING(100),
    allowNull: false
},
 stock:{
   type: DataTypes.BOOLEAN,
   defaultValue: true,
}
},{
    timestamps: false
});

//definicion de relaciones
//una categoria puede tener/pertenecer a muchos productos
//Category.hasMany(Product, {foreignKey: 'categoryId'});
//un producto pertenece a una categoria
// Product.belongsTo(Category, {foreignKey: 'categoryId'});
//con esto tmbn valido q no se puedan asignar productos a 
//categorias que no existan:P