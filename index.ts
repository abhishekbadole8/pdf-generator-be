import express, { Express, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from "./configs/dbConnection";

import userRoutes from "./routes/userRoutes";

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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
