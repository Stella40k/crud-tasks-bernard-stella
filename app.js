//importaciones 
import express from "express";
import "dotenv/config";
import { connect } from "./src/config/database.js";
import { TaskRouter } from "./src/routes/task.routes.js";
import { UserRouter } from "./src/routes/usuario.routes.js";
import { task } from "./src/model/task.model.js";
import { user } from "./src/model/user.model.js";
//import cors from 'cors'; //cors es para permitir el acceso a la api desde otros lados


const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use("/api/task", TaskRouter);
app.use("/api/user", UserRouter);
//app.use(cors()); //aplicamos cors a la ruta /api


app.listen(PORT, () =>{
    console.log(`Server corriendo en el puerto ${PORT}`);
});

connect()