import { sequelize } from "../config/database.js"; 
import { DataTypes } from "sequelize";
import { Order } from "./orders.model.js";
import { Product } from "./products.model.js";

export const productOrder = sequelize.define('PedidoProducto', {
 cantidad:{
    type: DataTypes.INTEGER,
    allowNull: false
 },
 precio_unitario:{
   type: DataTypes.FLOAT,
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