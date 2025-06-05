import express from "express";

import {
    getThisTarget
} from "./../controllers/target.controller.ts";

const router = express.Router();


router.get("/:id", getThisTarget);



export default router;