import { Order } from "../model/orders.model.js";
import { User } from "../model/user.model.js";
import { Product } from "../model/products.model.js";
import { productOrder } from "../model/orders_products.model.js";

export const allOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include:[
                { model: User, 
                  attributes: ['name', 'email']
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
                  attributes: ['name', 'email']
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
        const { user_id, products, cantidad } = req.body;

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
        //este es el arreglo q hice vacio y voy llenando con los productos q voy encontrando
        //pero al arreglo le agregamos un nueo objeto q es el producto encontrado y asi recorriendo todo el 
        //array de los productos q me mandaron por el body
       // productsDetails.push(existProduct);
        totalPrice += existProduct.precio; //voy sumando el precio de cada producto q voy encontrando
        //totalP es 0 por defecto, aca se le va sumando los precios de los products q encuentra
        //pedir igual mas explicacion de esto
        const newOrder = await Order.create({
            user_id,
            fecha: new Date(),
            estado: "pendiente" //q sea pendiente por defecto
        });
        //agrego los productos a la tabla intermedia 
        for(const pedido of products){
            const cambiar = await Product.findByPk(pedido.product_id);
            await productOrder.create({
                order_id: newOrder.id,
                product_id: product.id,
                cantidad: pedido.cantidad
                // precio_unitario: product.precio
            });
        }  
        const createdOrder = await Order.findByPk(newOrder.id, {
            include:[
                { model: User, 
                  attributes: ['name', 'email']
                },
                { model: productOrder, 
                  include: { model: Product, attributes: ['name', 'precio','stock', 'categoria'] },
                }
            ]
        });  
        return res.status(201).json({ message: "pedido creado", createdOrder }); 
    } catch (error) {
        return res.status(500).json({ error: "error al crear el pedido" });
    }
}    
export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        //valido que el estado sea uno de los permitidos
        const orderValid = ["pendiente", "enviado", "entregado"];
        if (!orderValid.includes(estado)) { 
            return res.status(400).json({ error: "estado no valido" });
        }
        const orderNew = await Order.findByPk(id);
        if (!orderNew){
            return res.status(404).json({ error: "pedido no encontrado" });
        }
        orderNew.estado = estado;//actualizo el estado del pedido
        await orderNew.save();//guardo los cambios

        return res.status(200).json({ message: "estado del pedido actualizado", orderNew });
    } catch (error) {
        return res.status(500).json({ error: "error al actualizar el estado del pedido" });
    }
}
export const deleteOrder = async (req, res) => {
    try {
        const {id} = req.params;
        const order = await Order.findByPk(id);
        if(!order){
            return res.status(404).json({ error: "pedido no encontrado"});
        }
        //primero elimino o deberia eliminar los productos asociados a ese pedido en la tabla intermedia
        //preguntar mas de esto
        await productOrder.destroy({ where: { order_id: id } });
        //elimino el pedido
        await order.destroy();
        res.status(200).json({ message: "pedido eliminado"});
    } catch (error) {
        return res.status(500).json({ error: "no se pudo eliminar el pedido"});
    }
}

// export const getOrderByUser = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const user = await User.findByPk(userId);
//         if (!user){
//             return res.status(404).json({ error: "usuario no encontrado" });
//         }
//         const ordersUss = await Order.findAll({
//             where: { user_id: userId },
//             include: [
//                 {   
//                     model: productOrder,
//                     include: { model: Product, attributes: ['name', 'precio', 'stock', 'categoria'] },
//                 }
                    
//             ]
//         });
//         res.status(200).json(ordersUss);
//     } catch (error) {
//         return res.status(500).json({ error: "error del servidor" });
//     }       
// }    