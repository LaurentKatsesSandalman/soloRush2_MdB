import type { RequestHandler } from "express";
import { findObjectById} from "../models/object.model";

// The R of BREAD - Read operation
export const getThisObject: RequestHandler = async (req, res, next) => {
    try {
        const objectId = Number.parseInt(req.params.id)
        if (isNaN(objectId)) {
            res.status(400).json({ error: 'L\'id du object est censée être numérique' });
            return;
        }
        // Fetch a specific object based on the provided ID: object
        const object = await findObjectById(objectId);
        //respond with the object in JSON format
        res.json(object);
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};