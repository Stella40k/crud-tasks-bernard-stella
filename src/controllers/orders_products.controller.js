import { Order } from "../model/orders.model.js";
import { User } from "../model/user.model.js";
import { Product } from "../model/products.model.js";

export const addProductToOrder = async (req, res) => {
    try {
        const { order_id, product_id, cantidad = 1 } = req.body;
         if (!order_id || !product_id) {
                return res.status(400).json({ error: "order_id y product_id son obligatorios" });
        }
           
