import { BelongsTo, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Order } from "./orders.model.js";
import { Product } from "./products.model.js";

export const productOrder = sequelize.define('productOrder', {
 cantidad:{
    type: DataTypes.INTEGER,
    allowNull: false
 },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
},
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
}
},{
  timestamps: false
});

//definicion de relaciones
//relacion m:m entre orders(pedidos) y products(productos) a traves de esta tabla pq
//un pedido puede tener muchos productos y un producto puede estar en muchos pedidos

//un pedido puede tener muchos productos
Order.belongsToMany(Product, {through: productOrder, foreignKey: 'order_id'});
//un producto puede estar en muchos pedidos
Product.belongsToMany(Order, {through: productOrder, foreignKey: 'product_id'});
//crea la tabla y permite traer todas las relaciones a traves de esa tabla, solo la info a la q esta relacionada

orders_products.BelongsTo(Order, {foreignKey: 'order_id', as: 'order'});
orders_products.BelongsTo(Product, {foreignKey: 'product_id', as: 'product'});
//relacion para que cuando traiga un order_product me traiga el order y el product asociado
//con esta config podemos listar todas ñas proiedades q hay con estas ids 
//sin esto no podremos consultar las cosas desde la tabla intermedia 