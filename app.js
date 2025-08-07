//importaciones 
import "dotenv/config";
import express from "express";
import cors from 'cors'; //cors es para permitir el acceso a la api desde otros lados


const app = express();
app.use(express.json(), );
app.use(cors()); //aplicamos cors a la ruta /api
