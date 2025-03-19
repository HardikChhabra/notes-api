import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Autherization");
  if (!token) {
    res.status(401).json({ error: "Not autherized!" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded != "object" || !decoded?.userId) {
      res.status(401).json({ error: "Access Denied!" });
      return;
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
}
