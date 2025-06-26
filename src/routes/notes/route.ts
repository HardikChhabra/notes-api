import { Router } from "express";
import {
  createNote,
  deletePostById,
  getAllNotes,
  updatePostById,
} from "./handlers.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { createNoteSchema, updateNoteSchema } from "../../db/schema.js";

const router = Router();

//C
router.post("/create", validateData(createNoteSchema), createNote);

//R
router.get("/read", getAllNotes);

//U
router.put("/update/:id", validateData(updateNoteSchema), updatePostById);

//D
router.delete("/delete/:id", deletePostById);

export default router;
