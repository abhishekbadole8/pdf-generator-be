import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Custom Request interface to include user id in the request object
interface AuthRequest extends Request {
  id?: string; // Assuming id is a string; change the type if needed
  name?: string; // Add the name property
}

const authTokenHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (
      authHeader &&
      typeof authHeader === "string" &&
      authHeader.startsWith("Bearer")
    ) {
      const token = authHeader.split(" ")[1];

      if (!token) {
        res
          .status(400)
          .json({ error: "User is not authorized or token is missing" });
        return;
      }

      jwt.verify(token, process.env.JWT_SECRET as string, (error, decoded) => {
        if (error) {            
          res.status(401).json({ error: "User is not authorized" });
          return;
        }

        req.id = (decoded as JwtPayload).id;
        req.name = (decoded as JwtPayload).name;
        next();
      });
    } else {
      res.status(400).json({ error: "Invalid token format" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default authTokenHandler;
