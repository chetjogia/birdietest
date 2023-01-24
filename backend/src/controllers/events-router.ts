/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-misused-promises */
import * as express from "express";
import { getAllEvents } from "../models/events-controller";
import { Request, Response } from "express";
export const eventsRouter = express.Router();

eventsRouter.get("/events", async (_req: Request, res: Response) => {
  try {
    const result = await getAllEvents();
    res.status(200).send({ success: true, payload: result });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
