import * as express from "express";
//import pool from "../../db/index";
export const eventsRouter = express.Router();

import { getEvents } from "../controllers/events-controller";

eventsRouter.get("/events", getEvents);
