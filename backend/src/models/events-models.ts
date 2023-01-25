import db from "../../db";
import { MysqlError } from "mysql";

//***Redundant get request model***
/* export function getAllEvents(): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM events;", (err: MysqlError | null, data: any) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}
 */


//model to get events for care recipient based on id and filter criteria
export function getEventsForUserByIdAndFilter(
  id: string,
  startDate: any | null,
  endDate: any | null,
  eventType: any | null,
  careGiver: any | null
): Promise<Record<string, unknown>> {
  //wrap mysql query in promise so return is possible to controller and when resolved, pass info
  return new Promise((resolve, reject) => {
    //SQL query using or statements to pass over filter if no filter is specified, dates are required however
    db.query(
      "SELECT * FROM events WHERE  events.care_recipient_id = ? AND events.timestamp >= ? AND events.timestamp <= ? AND (? IS NULL OR events.event_type=?) AND (? IS NULL OR events.caregiver_id=?) ORDER BY events.timestamp DESC",
      [id, startDate, endDate, eventType, eventType, careGiver, careGiver],
      (err: MysqlError | null, data: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      }
    );
  });
}


//get distinct events for care recipient
export function getDistinctEventsforUser(
  id: string
): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT event_type, count(*) FROM events WHERE events.care_recipient_id = ? GROUP BY event_type ",
      [id],
      (err: MysqlError | null, data: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      }
    );
  });
}

//get distinct care givers for care recipient
export function getDistinctCareGiversforUser(
  id: string
): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT caregiver_id, count(*) FROM events WHERE events.care_recipient_id = ? GROUP BY caregiver_id ",
      [id],
      (err: MysqlError | null, data: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      }
    );
  });
}

//get distinct care recipients
export function getDistinctUsers(): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT care_recipient_id, count(*) FROM events GROUP BY care_recipient_id ",
      (err: MysqlError | null, data: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      }
    );
  });
}
