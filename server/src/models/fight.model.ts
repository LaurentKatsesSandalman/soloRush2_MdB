import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model";
import { Fight } from "../types/types";

export async function findFightById(id: number): Promise<Fight | undefined> {
  const [rows] = await database.query<Fight[] & RowDataPacket[]>(
    `SELECT * FROM fight WHERE fight_id=?`,
    [id]
  );
  return rows[0];
}