import { Router } from "express";
import {
  createNote,
  deletePostById,
  getAllNotes,
  updatePostById,
} from "./handlers";
import { validateData } from "../../middlewares/validationMiddleware";
import { createNoteSchema, updateNoteSchema } from "../../db/schema";

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
