import { ResultSetHeader, RowDataPacket } from "mysql2";
import database from "./db_model";
import { Contrainte } from "../types/types";

export async function findConstraintById(id: number): Promise<Contrainte | undefined> {
  const [rows] = await database.query<Contrainte[] & RowDataPacket[]>(
    `SELECT * FROM contrainte WHERE contrainte_id=?`,
    [id]
  );
  return rows[0];
}