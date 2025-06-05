import type { RequestHandler } from "express";
import { findConstraintById} from "../models/constraint.model";

// The R of BREAD - Read operation
export const getThisConstraint: RequestHandler = async (req, res, next) => {
    try {
        const constraintId = Number.parseInt(req.params.id)
        if (isNaN(constraintId)) {
            res.status(400).json({ error: 'L\'id du constraint est censée être numérique' });
            return;
        }
        // Fetch a specific constraint based on the provided ID: constraint
        const constraint = await findConstraintById(constraintId);
        //respond with the constraint in JSON format
        res.json(constraint);
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};