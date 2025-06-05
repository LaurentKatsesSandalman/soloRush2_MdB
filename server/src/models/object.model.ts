import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model.ts";
import { Zobject } from "../types/types";

export async function findObjectById(id: number): Promise<Zobject | undefined> {
  const [rows] = await database.query<Zobject[] & RowDataPacket[]>(
    `SELECT * FROM zobject WHERE zobject_id=?`,
    [id]
  );
  return rows[0];
}