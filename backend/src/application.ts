import express from "express";
import { eventsRouter } from "./controllers/events-router";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

//use eventsRouter to handle requests
app.use(eventsRouter);

export default app;
