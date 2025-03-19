import express from "express";
import { json, urlencoded } from "express";
import notesRouter from "./routes/notes/route";
import authRouter from "./routes/auth/route";
import { verifyToken } from "./middlewares/authMiddleware";

const app = express();
const port = 3000;

app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/notes", verifyToken, notesRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
