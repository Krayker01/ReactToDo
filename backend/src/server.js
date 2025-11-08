import express from "express";
const app = express();
import notesRoutes from "./routes/notesRoutes.js";

app.use("/api/notes", notesRoutes);

app.listen(3000, () => console.log("Server was started on port 3000"));