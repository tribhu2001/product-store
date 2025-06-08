import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import cors from "cors";

const app = express();

dotenv.config();

app.use(express.json()); // Middleware to parse JSON bodies

app.use(cors()); // Enable CORS for all routes

app.use("/api/products",productRoutes);



app.listen(5000, () => {
    connectDB();
  console.log("Server is running on port http://localhost:5000");
});

// Tm2SJ5iyWM3ZXrnD