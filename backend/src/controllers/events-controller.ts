import { Request, Response } from "express";
import db from "../../db";

export function getEvents(_: Request, res:Response){
    db.query(
        "SELECT * FROM events WHERE events.id='0e769842-2bdd-4f8d-bae9-6d42c28049cc';",
        (err: any, data: any) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(data);
          res.send(data);
        }
      );

}