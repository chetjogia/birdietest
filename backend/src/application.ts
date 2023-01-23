import * as express from "express";
import { eventsRouter } from "./routers/events";

const app = express();

app.use(eventsRouter);

export default app;
