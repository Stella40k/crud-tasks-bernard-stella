import { Product } from "../model/products.model.js";

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
        const { name, stock, precio, description} = req.body;
        if(!name?.trim() || !stock?.trim() || precio === undefined){
            return res.status(400).json({ error: "Faltan datos obligatorios"});
        } 
        if(name.length > 100 || description.length > 100){
            return res.status(400).json({ error: "el nombre o la descripcion no puede ser mayor a 100 caracteres"});
        }
        if(typeof stock !== "boolean"){
            return res.status(400).json({ error: "stock debe ser un booleano"});
        }

        const category = await Category.findByPk(categoryId);
        if(!category) return res.status(404).json({ error: "Categoria no encontrada"});

        const newProduct = await Product.create({
            name,
            stock,
            precio,
            categoryId
        });
        res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({ error: "error interno del servidor, busque mas tarde"});
    }
}

