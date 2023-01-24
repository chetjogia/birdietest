import * as express from "express";
import { eventsRouter } from "./controllers/events-router";

const app = express();

app.use(express.json());
app.use(eventsRouter);

export default app;
