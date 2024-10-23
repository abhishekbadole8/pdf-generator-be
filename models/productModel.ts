import mongoose, { Schema, Document } from "mongoose";

interface ICartItem {
  name: string;
  quantity: number;
  rate: number;
}

interface IProduct extends Document {
  userId: mongoose.Types.ObjectId;
  cartItems: ICartItem[];
}

const productSchema = new Schema<IProduct>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to User model
    },
    cartItems: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        total_price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Export the Product model
const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
