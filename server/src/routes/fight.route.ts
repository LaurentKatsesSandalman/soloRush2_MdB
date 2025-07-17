import express from "express";

import {
    getThisFight
} from "./../controllers/fight.controller";

const router = express.Router();


router.get("/:id", getThisFight);



export default router;