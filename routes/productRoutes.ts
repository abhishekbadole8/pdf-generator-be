import { Router } from "express";
import { addProducts } from "../controllers/productController";

const router: Router = Router();

router.post("/invoice-download", addProducts);

export default router;
