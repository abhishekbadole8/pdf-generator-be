import { Request, Response } from "express";
import Product from "../models/productModel";
import { ICartItem } from "../types/ICartItem";
import { generatePDF } from "../utils/generatePDF";

const addProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, name } = req;
    const products: ICartItem[] = req.body;

    const newProduct = await Product.create({
      userId: id,
      cartItems: products,
    });

    let pdfBuffer;
    if (name && products) {
      pdfBuffer = await generatePDF(products, name);
    }

    if (!pdfBuffer) {
      res.status(500).json({ error: "Failed to generate PDF." });
      return;
    }

    // Set response headers for PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="products.pdf"');
console.log(pdfBuffer);

    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error adding products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { addProducts };
