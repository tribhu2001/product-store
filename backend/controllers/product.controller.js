import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Error fetching products", error: error.message });
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;

    if(!product.name || !product.price ) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error saving product", error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if(mongoose.Types.ObjectId.isValid(id) === false) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true, runValidators: true });
        return res.status(200).json({ success: true, data: updatedProduct });
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ success: false, message: "Error updating product", error: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    console.log("Deleting product with ID:", id);
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting product", error: error.message });
    }
}