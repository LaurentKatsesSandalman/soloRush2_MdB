import express from "express";

import {
    getThisEffect
} from "./../controllers/effect.controller";

const router = express.Router();


router.get("/:id", getThisEffect);



export default router;