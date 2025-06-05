import type { RequestHandler } from "express";
import { findChapterById} from "../models/chapter.model";

// The R of BREAD - Read operation
export const getThisChapter: RequestHandler = async (req, res, next) => {
    try {
        const chapterId = Number.parseInt(req.params.id)
        if (isNaN(chapterId)) {
            res.status(400).json({ error: 'L\'id du chapter est censée être numérique' });
            return;
        }
        // Fetch a specific chapter based on the provided ID: chapter
        const chapter = await findChapterById(chapterId);
        //respond with the chapter in JSON format
        res.json(chapter);
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};