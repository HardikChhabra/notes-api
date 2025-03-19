import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const notes = pgTable("notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  title: text("title").default(""),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  //color: varchar("color", { length: 7 }).notNull().default("#FFFFFF"),
});
export const createNoteSchema = createInsertSchema(notes).omit({
  id: true,
  email: true,
  createdAt: true,
});
export const updateNoteSchema = createInsertSchema(notes)
  .omit({
    id: true,
    email: true,
    createdAt: true,
  })
  .partial();

export const users = pgTable("users", {
  email: text("email").primaryKey(),
  name: text("name").notNull(),
  password: text("password").notNull(),
});
export const createUserSchema = createInsertSchema(users);
export const loginSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
});

export const usersRelations = relations(users, ({ many }) => ({
  notes: many(notes),
}));
