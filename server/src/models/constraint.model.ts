import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model.ts";
import { Constraint } from "../types/types";

export async function findConstraintById(id: number): Promise<Constraint | undefined> {
  const [rows] = await database.query<Constraint[] & RowDataPacket[]>(
    `SELECT * FROM contrainte WHERE contrainte_id=?`,
    [id]
  );
  return rows[0];
}