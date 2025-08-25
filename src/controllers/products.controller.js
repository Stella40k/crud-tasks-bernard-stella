import { Product } from "../model/products.model.js";
import "dotenv/config";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: "error interno del servidor, busque mas tarde"});
    }
}
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if(!product){
             return res.status(404).json({ error: "producto no encontrado"});
        }
        res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: "error interno del servidor, busqca mas tarde"});
    }
}
export const createProduct = async (req, res) => {
    try {
        const { name, stock, precio, description, categoria} = req.body;
        if (!name?.trim() || !description?.trim() || precio === undefined || stock === undefined) {
            return res.status(400).json({ error: "completar los datos obligatorios" });
        }
        if (name.trim().length < 2 || name.trim().length > 100) {
            return res.status(400).json({ error: "el nombre debe ser mayor a 2 y menor a 100 caracteres" });
        }
        if (description.trim().length < 5 || description.trim().length > 100) {
            return res.status(400).json({ error: "la descripción debe tener entre 5 y 100 caracteres" });
        }
        if (!categoria || !categoria.trim()) {
        return res.status(400).json({ error: "a categoría es obligatoria" });
        }
        if (categoria.trim().length < 5 || categoria.trim().length > 100) {
            return res.status(400).json({ error: "la categoría debe tener entre 5 y 100 caracteres" });
        }
        const Price = parseFloat(precio);
        if (Price < 0) {
            return res.status(400).json({ error: "el precio debe ser un número natural mayor o igual a 0" });
        }
        if (typeof stock !== "boolean") {
            return res.status(400).json({ error: "stock debe verdadero o falso" });
        }
        const newProduct = await Product.create({
            name: name.trim(),
            stock,
            precio: parsedPrice,
            description: description.trim(),
            categoria: categoria?.trim() || null
        });
        res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({ error: "error interno del servidor"});
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, stock, precio, description, categoria} = req.body;
        const productUpdate = await Product.findByPk(id);
        //console.log(productUpdate);
        if(!productUpdate){
            return res.status(404).json({ error: "producto no encontrado"});
        }
        if (!name?.trim() || !description?.trim() || precio === undefined || stock === undefined) {
            return res.status(400).json({ error: "completar los datos obligatorios" });
        }
        if (name.trim().length < 2 || name.trim().length > 100) {
            return res.status(400).json({ error: "el nombre debe ser mayor a 2 y menor a 100 caracteres" });
        }
        if (description.trim().length < 5 || description.trim().length > 100) {
            return res.status(400).json({ error: "la descripción debe tener entre 5 y 100 caracteres" });
        }
        if (!categoria || !categoria.trim()) {
            return res.status(400).json({ error: "la categoría es obligatoria" });
        }
        if (categoria.trim().length < 5 || categoria.trim().length > 100) {
            return res.status(400).json({ error: "la categoría debe tener entre 5 y 100 caracteres" });
        }
        const Price = parseFloat(precio);
        //parseFloat convierte el string q viene en un numero o tipo numero 
        if (isNaN(Price) || Price < 0) {
            //el isNaN es para validar si es un numero o no
            return res.status(400).json({ error: "el precio debe ser un número natural mayor o igual a 0" });
        }
        if (typeof stock !== "boolean") {
            return res.status(400).json({ error: "stock debe verdadero o falso" });
        }
        await productUpdate.save();
        res.status(200).json({message:"producto actualizado: ", productUpdate});
    } catch (error) {
        return res.status(500).json({ error: "error interno del servidor"});
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productDelet = await Product.findByPk(id);
        
        if (!productDelet) {
            return res.status(404).json({ error: "produto no encontrado" });
        }
        await productDelet.destroy();
        res.status(200).json({ message: "producto eliminado", productDelet });
    } catch (error) {
        return res.status(500).json({ error: "error interno del servidor" });
    }
};