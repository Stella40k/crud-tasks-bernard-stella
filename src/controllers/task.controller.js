import { Task } from "../model/task.model.js";
//las variables q vienen de afuera tienen q tener nombre o algo diferente a las constantes nuevas q haga
import "dotenv/config";


export const getAllTasks = async (req, res) => {
    try {
        const task = await Task.findAll();
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({error: "error de conexion con la base de datos"})
    }
};
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "tarea no encontrado"})
        }
        console.log(task);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({error: "verificar la id de la tarea o la existencia de la misma"});
    }
};
 export const createTask = async (req, res) => {
    try {
        let { title, description, isComplete} = req.body;
        //falta el de la cantidad de los caracteres
        if (!title || !description) {
            return res.status(400).json({error: "completar los campos obligatorios"});
        }       
        if (!typeof isComplete === "boolean") {
            isComplete = false;         
        }
        const respuestas= ["si", "no", "en proceso"]; //los valores a elegir para el bool
        if(!respuestas.includes(isComplete.toLowerCase())){
            return res.status(400).json({error: "el campo completo debe ser si, no o en proceso"});
        }

        console.log({title, description, isComplete});
    } catch (error) {
        res.status(500).json({error: "error al crear la tarea"});
    }
 };
 export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isComplete } = req.body;
        const taskUpdate = await Task.findByPk(id);

        if (!taskUpdate) {
            return res.status(404).json({ error: "tarea no encontrada" });   
        }
        if (title) taskUpdate.title = title.trim();
        if (description) taskUpdate.description = description.trim();
        if (typeof isComplete === "boolean") taskUpdate.isComplete = isComplete;

        await taskUpdate.save();
        res.status(200).json({ message: "se actualizo la tarea", taskUpdate });
    
    } catch (error) {
       res.status(500).json({ error: "error al actualizar la tarea" } ); 
    }
 };
 export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const taskDelete = await Task.findByPk(id);

        if (!taskDelete) {
            return res.status(404).json({ error: "tarea no encontrada" });
        }

        const deletedTask = await taskDelete.destroy();
        res.status(200).json({ message: "tarea eliminada", deletedTask });
    } catch (error) {
        return res.status(500).json({ error: "error al eliminar la tarea" });
    }
 };