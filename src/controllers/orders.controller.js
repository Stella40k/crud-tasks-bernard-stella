import { Order } from "../model/orders.model.js";
import { User } from "../model/user.model.js";
import { Product } from "../model/products.model.js";
import { productOrder } from "../model/orders_products.model.js";
import "dotenv/config";

export const allOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include:[
                { model: User, 
                  attributes: ['nombre', 'email']
                },
                {
                    model: productOrder, 
                    include: { model: Product, attributes: ['name', 'precio','stock', 'categoria'] },
                }
            ]
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error("error al buscar los pedidos:", error);
        res.status(500).json({ error: "error" });
    }
}
export const getOrderById = async (req, res) => {   
    try {
        const {id} = req.params;
        const order = await Order.findByPk(id, {
            include: [
                { model: User, 
                  attributes: ['nombre', 'email']
                }
            ]
        });
        if (!order) {
            return res.status(404).json({ error: "pedido no encontrado" });
        }
        res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ error: "error del servidor" });
    }
}
export const createOrder = async (req, res) => {
    try {
        const { user_id, products } = req.body;

        // productos = [1,2,3]
        // user = 1
        if(!user_id){
            return res.status(400).json({ error: "el usuario es obligatorio"});
        }
        if(!products||products.length===0){
            return res.status(400).json({ error: "el pedido debe tener al menos un producto"});
        }
        //valido la existencia del usuario pq sin usuario no debe haber pedido
        const existingUser = await User.findByPk(user_id);
        if(!existingUser){
            return res.status(404).json({ error: "usuario no encontrado"});
        }
        //recorre y valida toooda la cadena de arrays q se le metas
        //produtId of products significa q por cada id de producto dentro del array products recorrera
        for(const productId of products){
            const existProduct = await Product.findByPk(productId)
            if(!existProduct){
                return res.status(404).json({ error: `el producto con id ${products.id} no existe`});
            }
        }
        const newOrder = await Order.create({ user_id, fecha: new Date() });
        const productOrder = 
        //agrego los productos a la tabla intermedia 
        for(const productId of products){
            const product = await Product.findByPk(productId);
            await productOrder.create({
                order_id: newOrder.id,
                product_id: product.id,
                cantidad: 1, //por defecto la cantidad es 1
                precio_unitario: product.precio
            });
        }     
    } catch (error) {
        
    }
}    