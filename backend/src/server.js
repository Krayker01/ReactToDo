import express from "express";
const app = express();
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

connectDB();

app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server was started on PORT:", PORT));
