import mongoose from "mongoose";
import { ICartItem } from "./ICartItem";

export interface IUserData {
  userId: mongoose.Types.ObjectId;
  cartItems: ICartItem[];
}
