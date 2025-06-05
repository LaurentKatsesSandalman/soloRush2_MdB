import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model.ts";
import { Object } from "../types/types";

export async function findObjectById(id: number): Promise<Object | undefined> {
  const [rows] = await database.query<Object[] & RowDataPacket[]>(
    `SELECT * FROM zobject WHERE zobject_id=?`,
    [id]
  );
  return rows[0];
}