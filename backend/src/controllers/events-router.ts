/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-misused-promises */
import * as express from "express";
import {
  getDistinctCareGiversforUser,
  getDistinctEventsforUser,
  getDistinctUsers,
  getEventsForUserByIdAndFilter,
} from "../models/events-models";
import { Request, Response } from "express";
export const eventsRouter = express.Router();

// get request to obtain the events for a user by ID and by a filter
eventsRouter.get("/events/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    let eventType;
    let careGiver;

    if (req.query.eventType === "null") {
      eventType = null;
    } else {
      eventType = req.query.eventType;
    }

    if (req.query.careGiver === "null") {
      careGiver = null;
    } else {
      careGiver = req.query.careGiver;
    }

    const result = await getEventsForUserByIdAndFilter(
      id,
      startDate,
      endDate,
      eventType,
      careGiver
    );
    res.status(200).send({ success: true, payload: result });
  } catch (e) {
    res.sendStatus(500);
  }
});

//obtain distinct event types by care recipient id
eventsRouter.get("/distinctevents/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await getDistinctEventsforUser(id);
    res.status(200).send({ success: true, payload: result });
  } catch (e) {
    res.sendStatus(500);
  }
});

//obtain distinct care recipients
eventsRouter.get("/distinctusers/", async (_req: Request, res: Response) => {
  try {
    const result = await getDistinctUsers();
    res.status(200).send({ success: true, payload: result });
  } catch (e) {
    res.sendStatus(500);
  }
});

//obtain distinct care givers by care recipient id
eventsRouter.get(
  "/distinctcaregivers/:id",
  async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const result = await getDistinctCareGiversforUser(id);
      res.status(200).send({ success: true, payload: result });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
);
