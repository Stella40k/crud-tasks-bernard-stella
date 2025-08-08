import { user } from "../model/task.model.js";
import { config } from "dotenv";

export const getAllUser = async (req, res) => {
    try {
        const user = await user.findAll();
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: "error de conexion con la base de datos"})
    }
};
export const getUserById = async (req, res) => {
    try {
        const user = await user.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "usuario no encontrado"})
        }
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({error: "verificar la id del usuario o la existencia del mismo"});
    }
};
 export const createUser = async (req, res) => {
    try {
        const { name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({error: "completar los campos obligatorios"});
        }
        console.log({name, email, password});
    } catch (error) {
        res.status(500).json({error: "error al crear el usuario"});
    }
 };
 export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const userUpdate = await user.findByPk(id);

        if (!userUpdate) {
            return res.status(404).json({ error: "usuario no encontrado" });   
        }
        if (name) userUpdate.name = name.trim();
        if (email) userUpdate.email = email.trim();
        if (password) userUpdate.password = password;
        //ver para poner una validacion de contr por longitud
    } catch (error) {
        
    }
 };
 export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userDelete = await user.findByPk(id);

        if (!userDelete) {
            return res.status(404).json({ error: "usuario no encontrado" });   
        }

        const deletedUser = await userDelete.destroy();
        res.status(200).json({ message: "usuario eliminado", deletedUser });
    } catch (error) {
        return res.status(500).json({ error: "error al eliminar el usuario" });
    }
 };