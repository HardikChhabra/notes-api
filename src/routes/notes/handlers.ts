import { Request, Response } from "express";
import { db } from "../../db/index";
import { notes } from "../../db/schema";
import { and, eq } from "drizzle-orm";

//C
export async function createNote(req: Request, res: Response) {
  try {
    const email = req.userId;
    const [newNote] = await db
      .insert(notes)
      .values({ ...req.body, email })
      .returning();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error });
  }
}

//R
export async function getAllNotes(req: Request, res: Response) {
  try {
    const allNotes = await db
      .select()
      .from(notes)
      .where(eq(notes.email, String(req.userId)));
    res.status(200).json(allNotes);
  } catch (error) {
    res.status(500).json({ error });
  }
}

//U
export async function updatePostById(req: Request, res: Response) {
  try {
    const updatedFields = req.cleanBody;
    const [updatedNote] = await db
      .update(notes)
      .set(updatedFields)
      .where(
        and(eq(notes.id, req.params.id!), eq(notes.email, String(req.userId)))
      )
      .returning();
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ error });
  }
}

//D
export async function deletePostById(req: Request, res: Response) {
  try {
    const [deletedNote] = await db
      .delete(notes)
      .where(
        and(eq(notes.id, req.params.id!), eq(notes.email, String(req.userId)))
      )
      .returning();
    if (!deletedNote) {
      res.status(404).json({ error: "Note not found!" });
      return;
    }
    res.status(204);
  } catch (error) {
    res.status(500).json({ error });
  }
}
