import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model.ts";
import { Effect } from "../types/types";

export async function findEffectById(id: number): Promise<Effect | undefined> {
  const [rows] = await database.query<Effect[] & RowDataPacket[]>(
    `SELECT * FROM zeffect WHERE zeffect_id=?`,
    [id]
  );
  return rows[0];
}