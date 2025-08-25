import { Worker } from "../model/workers.model.js";
import "dotenv/config";
import bcrypt from "bcrypt";

export const getWorkers = async (req, res) => {
    try {
        const workers = await Worker.findAll();
        res.status(200).json(workers);
    } catch (error) {
        return res.status(500).json({ error: "error interno del servidor, intente más tarde"});
    }
}
export const getWorkerById = async (req, res) => {
    try {
        const {id} = req.params;    
        const worker = await Worker.findByPk(id);
        if(!worker){
             return res.status(404).json({ error: "trabajador no encontrado"});
        }
        res.status(200).json(worker);
    } catch (error) {
        return res.status(500).json({ error: "error interno"});
    }
}
export const createWorker = async (req, res) => {
    try {
        const { name, last_name, email, password, rol, activo} = req.body;
        if (!name?.trim() || !last_name?.trim() || !email?.trim() || !password?.trim() || !rol.trim()) {
          return res.status(400).json({ error: "completar los campos obligatorios" });
        }
        if (name.length < 3 || name.length > 100 || last_name.length < 3 || last_name.length > 100) {
          return res.status(400).json({ error: "el nombr y apellido deben tener entre 3 y 100 caracteres" });
        }
        if (rol){
            const validRoles = ["cajero", "administrador", "limpieza", "repositor"];
            if (!validRoles.includes(rol)){
                return res.status(400).json({error: "elegir un rol vslifdo"});
            }
        }
        //si viene algo en rol en el req compara con los q son validos
        //el include devuelve true si esta ese valor en el array o false
        //sino esta tira el error 

        if (activo !== undefined && typeof activo !== "boolean") {
            return res.status(400).json({ error: "activo debe ser verdadero o falso"});
        }
        //si viene activo en el req lo valida sino no hace nada
        //valido si es tru o false, no entendi bien. PROBAR OTRA VEZ
     //________________________________________________________________________________________________________
        //si funciona esta partre en user aca tambien debera
        const Email = /^[a-zA-Z0-9ñÑçÇ._%+-]+@[a-zA-Z0-9ñÑçÇ.-]+\.[a-zA-Z]{2,}$/;
            if (!Email.test(email.trim())){
                return res.status(400).json({error: "email no es valido"});
            }
        const existWorker = await Worker.findOne({ where: { email: email.trim()}});
            if (existWorker){
                return res.status(400).json({error: "email ya registrado"});
            }   
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //al menos 8 caracteres, una mayuscula, una minuscula y un numero        
            if (!passwordRegex.test(password)) {
                return res.status(400).json({error: "la contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero"});
            } 
        const passwordHash = await bcrypt.hash(password, 5); //encriptar
        const newWorker = await Worker.create({
            name: name.trim(),
            last_name: last_name.trim(),
            email: email.trim(),
            password: passwordHash,
            rol,
            activo: activo !== undefined ? activo : true // default true si no viene
        });
        //la respuesta sin la contraseña(no vuelvo a meter cosas )
        const WorkerResponse = {
            id: newWorker.id,
            name: newWorker.name,
            last_name: newWorker.last_name,
            email: newWorker.email,
            rol: newWorker.rol,
            activo: newWorker.activo
        };
        res.status(201).json({ message: "Trabajador creado", WorkerResponse });
    } catch (error) {
        return res.status(500).json({ error: "error del servidor"});
    }
}
export const updateWorker = async (req, res) => {
    try {
        const {id} = req.params;
        const { name, last_name, email, password, rol, activo} = req.body
        const workerUpdate = await Worker.findByPk(id);
    
        if (!workerUpdate) {
          return res.status(404).json({ error: "trabajador no encontrado" });
        }
        if (!name?.trim() || !last_name?.trim() || !email?.trim() || !password?.trim() || !rol.trim()) {
          return res.status(400).json({ error: "completar los campos obligatorios" });
        }
        if (name.length < 3 || name.length > 100 || last_name.length < 3 || last_name.length > 100) {
          return res.status(400).json({ error: "el nombr y apellido deben tener entre 3 y 100 caracteres" });
        }
        if (rol) {
          const validRoles = ["cajero", "administrador", "limpieza", "repositor"];
            if (!validRoles.includes(rol)) {
             return res.status(400).json({ error: "rol inválido" });
            }
        }
        if (activo !== undefined && typeof activo !== "boolean") {
            return res.status(400).json({ error: "activo debe ser verdadero o falso"});
        }    
        await workerUpdate.update({ name, last_name, email, rol, activo });
        res.status(200).json({ message: "trabajador actualizado", workerUpdate});
    } catch (error) {
        return res.status(500).json({ error: "error del servidor"});
    } 
}
export const deleteWorker = async (req, res) => {
    try {
        const {id} = req.params;
        const workerDelete = await Worker.findByPk(id);
        if (!workerDelete) {
            return res.status(404).json({ error: "trabajador no encontrado" });
        }
        await workerDelete.destroy();
        res.status(200).json({ message: "trabajador eliminado", workerDelete });
    } catch (error) {
        return res.status(500).json({ error: "error interno del servidor"});
    }
}  