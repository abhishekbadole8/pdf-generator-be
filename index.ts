import express, { Express, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from "./configs/dbConnection";

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import authTokenHandler from "./middleware/authHandler";

const app: Express = express();
const port = process.env.PORT || 8000;

// Connect to the database
connectDb();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
app.use("/api/user", userRoutes);
app.use("/api/product", authTokenHandler, productRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
