import { Router, Request, Response } from "express";
import { createUserSchema, loginSchema, users } from "../../db/schema.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import bcrypt from "bcryptjs";
import { db } from "../../db/index.js";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

const router = Router();

//register
router.post(
  "/register",
  validateData(createUserSchema),
  async (req: Request, res: Response) => {
    try {
      const data = req.cleanBody;
      data.password = await bcrypt.hash(data.password, 10);
      const [user] = await db.insert(users).values(data).returning();
      user.password = "";
      const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
      });
      res
        .status(200)
        .json({ message: "User", token, email: user.email, name: user.name });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

//login
router.post(
  "/login",
  validateData(loginSchema),
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.cleanBody;
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      if (!user) {
        res.status(401).json({ error: "Authentication Failed!" });
        return;
      }
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        res.status(401).json({ error: "Authentication Failed!" });
        return;
      }
      const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
      });
      res.status(200).json({
        message: "User Logged in!",
        token,
        email: user.email,
        name: user.name,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

export default router;
