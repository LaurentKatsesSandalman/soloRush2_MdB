import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model.ts";
import { Target } from "../types/types";

export async function findTargetById(id: number): Promise<Target | undefined> {
  const [rows] = await database.query<Target[] & RowDataPacket[]>(
    `SELECT * FROM ztarget WHERE ztarget_id=?`,
    [id]
  );
  return rows[0];
}