import { Router } from "express";
import {
        getProducts,
        getProductById,
        createProduct, 
        updateProduct,
        deleteProduct
} from "../controllers/products.controller.js";

export const ProductRouter = Router();

ProductRouter.get("/", getProducts);
ProductRouter.get("/:id", getProductById);  
ProductRouter.post("/", createProduct);
ProductRouter.put("/:id", updateProduct);
ProductRouter.delete("/:id", deleteProduct);