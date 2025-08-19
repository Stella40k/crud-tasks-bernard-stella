//importaciones 
import express from "express";
import "dotenv/config";
import { connect } from "./src/config/database.js";
//rutas
import { TaskRouter } from "./src/routes/task.routes.js";
import { UserRouter } from "./src/routes/usuario.routes.js";
//todo los modelos
import { Product } from "./src/model/products.model.js";
import { Category } from "./src/model/categories.model.js";
import { Order } from "./src/model/orders.model.js";
import { Worker } from "./src/model/workers.model.js";
import {PedidoProducto} from "./src/model/orders_products.model.js";
//import cors from 'cors'; //cors es para permitir el acceso a la api desde otros lados


const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use("/api/task/", TaskRouter);
app.use("/api/user/", UserRouter);
//app.use(cors()); //aplicamos cors a la ruta /api


app.listen(PORT, async () =>{
    console.log(`Server corriendo en el puerto ${PORT}`);
});

connect();