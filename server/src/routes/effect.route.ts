import express from "express";

import {
    getThisEffect
} from "./../controllers/effect.controller.ts";

const router = express.Router();


router.get("/:id", getThisEffect);



export default router;