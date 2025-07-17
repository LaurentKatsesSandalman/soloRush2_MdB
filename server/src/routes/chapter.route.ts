import express from "express";

import {
    getThisChapter
} from "./../controllers/chapter.controller";

const router = express.Router();


router.get("/:id", getThisChapter);



export default router;