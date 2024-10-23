declare namespace Express {
  export interface Request {
    id?: mongoose.Types.ObjectId;
    name?: string;
  }
}
