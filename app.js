//importaciones 
import "dotenv/config";
import express from "express";
import cors from 'cors'; //cors es para permitir el acceso a la api desde otros lados


const app = express();
const PORT = process.env.PORT;
app.use(express.json(), );
app.use(cors()); //aplicamos cors a la ruta /api


app.listen(PORT, () =>{
    console.log(`Server corriendo en el puerto ${PORT}`);
});
