import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model.ts";
import { Zeffect } from "../types/types";

export async function findEffectById(id: number): Promise<Zeffect | undefined> {
  const [rows] = await database.query<Zeffect[] & RowDataPacket[]>(
    `SELECT * FROM zeffect WHERE zeffect_id=?`,
    [id]
  );
  return rows[0];
}