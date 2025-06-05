import type { RequestHandler } from "express";
import { findEffectById} from "../models/effect.model";

// The R of BREAD - Read operation
export const getThisEffect: RequestHandler = async (req, res, next) => {
    try {
        const effectId = Number.parseInt(req.params.id)
        if (isNaN(effectId)) {
            res.status(400).json({ error: 'L\'id du effect est censée être numérique' });
            return;
        }
        // Fetch a specific effect based on the provided ID: effect
        const effect = await findEffectById(effectId);
        //respond with the effect in JSON format
        res.json(effect);
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};