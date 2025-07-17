import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model";
import { Chapter } from "../types/types";

export async function findChapterById(id: number): Promise<Chapter | undefined> {
  const [rows] = await database.query<Chapter[] & RowDataPacket[]>(
    `SELECT * FROM chapter WHERE chapter_id=?`,
    [id]
  );
  return rows[0];
}