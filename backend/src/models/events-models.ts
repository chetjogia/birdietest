import db from "../../db";
import { MysqlError } from "mysql";
export function getAllEvents(): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM events;", (err: MysqlError | null, data: any) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

export function getEventsForUserByIdAndFilter(
  id: string,
  startDate: any | null,
  endDate: any | null,
  eventType: any | null,
  careGiver: any | null
): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM events WHERE  events.care_recipient_id = ? AND events.timestamp >= ? AND events.timestamp <= ? AND (? IS NULL OR events.event_type=?) AND (? IS NULL OR events.caregiver_id=?)",
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
