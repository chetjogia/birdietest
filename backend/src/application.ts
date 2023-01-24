import express from "express";
import { eventsRouter } from "./controllers/events-router";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(eventsRouter);

export default app;
