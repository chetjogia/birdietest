import db from "../../db";

export function getAllEvents(): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM events;", (err: any, data: any) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

export function getEventsForUserByIdAndDate(
  id: string,
  startDate: string,
  endDate: string
): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM events WHERE events.care_recipient_id = ? AND timestamp >= ? AND timestamp <= ?",
      [id, startDate, endDate],
      (err: any, data: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      }
    );
  });
}
