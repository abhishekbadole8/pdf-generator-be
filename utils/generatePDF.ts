import path from "path";
import puppeteer from "puppeteer";
import fs from "fs";
import { IUserData } from "../types/IUserData";
import { ICartItem } from "../types/ICartItem";

export const generatePDF = async (
  products: ICartItem[],
  name: string
): Promise<any> => {
  try {
    // Folder path
    const pdfFolderPath = path.join(__dirname, "../pdf-UI");

    // File's path
    const htmlPath = path.join(pdfFolderPath, "index.html");
    const cssPath = path.join(pdfFolderPath, "style.css");
    const logoPath = path.join(pdfFolderPath, "company-log.png");

    // Read HTML and CSS files from the file system
    let htmlContent = fs.readFileSync(htmlPath, "utf-8");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    let itemsHtml = "";
    products.forEach((item: any) => {
      itemsHtml += `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${item.price}</td>
          <td>${item.total_price}</td>
        </tr>
      `;
    });

    // Total of products - GST (not included)
    const final_total_price = products.reduce(
      (total: any, item: any) => total + item.quantity * item.price,
      0
    );
    // Only GST
    const gst_total = final_total_price * 0.18;
    // All Total Include GST
    const grandTotal = final_total_price + final_total_price * 0.18;
    const date = new Date().toLocaleString().substring(0, 10);

    // Replace placeholders for dynamic content
    htmlContent = htmlContent
      .replace("{{name}}", `${name}`)
      .replace("{{date}}", `${date}`)
      .replace(
        "{{companyLogo}}",
        `<img src="file://${logoPath}" alt="Company Logo">`
      )
      .replace("{{cartItems}}", itemsHtml)
      .replace("{{totalPrice}}", `INR ${final_total_price}`)
      .replace("{{gstAmount}}", `INR ${gst_total}`)
      .replace("{{grandTotal}}", `INR ${grandTotal}`);


    // Puppeteer launch
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setContent(`
        <html>
          <head>
            <style>${cssContent}</style>
          </head>
          <body>
            ${htmlContent}
          </body>
        </html>
      `);

    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();

    return pdfBuffer;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
