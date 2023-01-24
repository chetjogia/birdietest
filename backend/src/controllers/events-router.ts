/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-misused-promises */
import * as express from "express";
import {
  getAllEvents,
  getEventsForUserByIdAndDate,
} from "../models/events-controller";
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

eventsRouter.get("/events/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const result = await getEventsForUserByIdAndDate(id, startDate, endDate);
    res.status(200).send({ success: true, payload: result });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
