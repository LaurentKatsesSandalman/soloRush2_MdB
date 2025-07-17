import express from "express";

import {
    getThisTarget
} from "./../controllers/target.controller";

const router = express.Router();


router.get("/:id", getThisTarget);



export default router;