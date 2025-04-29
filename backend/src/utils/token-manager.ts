import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const jwtSecret = process.env.JWT_SECRET || "";
  
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  
  // @ts-ignore
  const token = jwt.sign(payload, jwtSecret, { expiresIn });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }
  
  const jwtSecret = process.env.JWT_SECRET || "";
  if (!jwtSecret) {
    return res.status(500).json({ message: "JWT_SECRET is not configured" });
  }
  
  return new Promise<void>((resolve, reject) => {
    // @ts-ignore
    return jwt.verify(token, jwtSecret, (err, success) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};
