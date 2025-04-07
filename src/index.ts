import express from "express";
import { json, urlencoded } from "express";
import notesRouter from "./routes/notes/route";
import authRouter from "./routes/auth/route";
import { verifyToken } from "./middlewares/authMiddleware";
import cors from "cors";

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/notes", verifyToken, notesRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
