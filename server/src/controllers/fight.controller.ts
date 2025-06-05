import type { RequestHandler } from "express";
import { findFightById} from "../models/fight.model";

// The R of BREAD - Read operation
export const getThisFight: RequestHandler = async (req, res, next) => {
    try {
        const fightId = Number.parseInt(req.params.id)
        if (isNaN(fightId)) {
            res.status(400).json({ error: 'L\'id du fight est censée être numérique' });
            return;
        }
        // Fetch a specific fight based on the provided ID: fight
        const fight = await findFightById(fightId);
        //respond with the fight in JSON format
        res.json(fight);
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};