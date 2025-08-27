import { Router } from "express";
import {
    allOrders,  
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    //getOrderByUser
} from "../controllers/orders.controller.js";
 
export const OrderRouter = Router();

OrderRouter.get('/', allOrders);
OrderRouter.get('/:id', getOrderById);
//OrderRouter.get('/user/:userId', getOrderByUser);
OrderRouter.post('/', createOrder);
OrderRouter.put('/:id/status', updateOrder);
OrderRouter.delete('/:id', deleteOrder);