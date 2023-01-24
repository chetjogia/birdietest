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
