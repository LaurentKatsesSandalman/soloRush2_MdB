import type { RequestHandler } from "express";
import { findTargetById} from "../models/target.model";

// The R of BREAD - Read operation
export const getThisTarget: RequestHandler = async (req, res, next) => {
    try {
        const targetId = Number.parseInt(req.params.id)
        if (isNaN(targetId)) {
            res.status(400).json({ error: 'L\'id du target est censée être numérique' });
            return;
        }
        // Fetch a specific target based on the provided ID: target
        const target = await findTargetById(targetId);
        //respond with the target in JSON format
        res.json(target);
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};