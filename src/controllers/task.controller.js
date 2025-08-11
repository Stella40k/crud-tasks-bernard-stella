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
        const { title, description, isComplete} = req.body;
        //falta el de la cantidad de los caracteres
        //____________para el titulo y la descripcion _________________________________________________
        if (!title || !description) {
            return res.status(400).json({error: "completar los campos obligatorios"});
        }       
        if (title.length > 100 || description.length > 100) {
            return res.status(400).json({error: "no se pueden superar los 100 caracteres"});
        }
        //____________________________________________________________________________________________
        if (!title || title.trim() === "") {
            return res.status(400).json({message: "no se permiten campos vacios"});
        }
        if (!description || description.trim() === "") {
            return res.status(400).json({message: "no se permiten campos vacios"});
        }
        //____________________________________________________________________________________________
        if (typeof isComplete === "boolean") {
            isComplete = false;         
        }
        //____________________________________________________________________________________________
        //caja = espera({ busca en: {titulos: el dato mq estan metiendo}}) y si existe mauestra el mensaje. Si no la crea
        const exisTitle = await Task.findOne({ where: { title: title.trim() } });
        if (exisTitle) {
            return res.status(400).json({ error: "ya existe una tarea con ese titulo" });
        }
        //____________________________________________________________________________________________
        //esto es para mostrar la tarea creada
        const newTask = await Task.create({
            title: title.trim(),
            description: description.trim(),
            isComplete
        });
        res.status(201).json({message: "tarea creada correctamente", newTask});
    } catch (error) {
        res.status(500).json({error: "error al crear la tarea"});
    }
 };
 export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isComplete } = req.body;
        const taskUpdate = await Task.findByPk(id);
        //____________________________________________________________________________________________
        if (!taskUpdate) {
            return res.status(404).json({ error: "tarea no encontrada" });   
        }
        //____________________________________________________________________________________________
        if(!title && title.trim()===""){
            return res.status(400).json({ error: "el titulo no puede estar vacio" });
        }
        if(!description && description.trim() ===""){
            return res.status(400).json({ error: "la descripcion no puede estar vacia" });
        }
        if (title.length > 100 || description.length > 100) {
            return res.status(400).json({error: "no se pueden superar los 100 caracteres"});
        }
        //____________________________________________________________________________________________
        //validacion para titulos repetidos
        const existTitle = await Task.findOne({ where: { title: title.trim() } });
        if (existTitle ) {
            return res.status(400).json({ error: "ya existe una tarea con ese titulo" });
        }
        //____________________________________________________________________________________________
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