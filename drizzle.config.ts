import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: ["./src/db/schema.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schemaFilter: "public",
  verbose: true,
  strict: true,
  introspect: {
    casing: "camel",
  },
  extensionsFilters: ["postgis"],
});
