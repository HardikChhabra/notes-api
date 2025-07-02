import express from "express";
import { json, urlencoded } from "express";
import notesRouter from "./routes/notes/route.js";
import authRouter from "./routes/auth/route.js";
import { verifyToken } from "./middlewares/authMiddleware.js";
import cors from "cors";
import { marked } from "marked";
import hljs from "highlight.js";
import fs from "fs";

const app = express();
/* const port = 3000; */

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(json());
app.use(urlencoded({ extended: false }));

marked.setOptions({
  //@ts-ignore
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
});
app.get("/", (req, res) => {
  const readmePath = "README.md";
  fs.readFile(readmePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Could not read README" });
    const htmlContent = marked(data);
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>README</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css" />
          <style>
            body {
              background: #f6f8fa;
              padding: 2rem;
              display: flex;
              justify-content: center;
            }
            .markdown-body {
              background: white;
              padding: 2rem;
              border-radius: 10px;
              max-width: 800px;
              width: 100%;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
          </style>
        </head>
        <body>
          <article class="markdown-body">
            ${htmlContent}
          </article>
        </body>
      </html>
    `);
  });
});

app.use("/notes", verifyToken, notesRouter);
app.use("/auth", authRouter);

/* app.listen(port, () => {
  console.log(`Listening on port ${port}`);
}); */
export default app; // Export the app for testing or deployment
