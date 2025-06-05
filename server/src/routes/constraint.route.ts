import express from "express";

import {
    getThisConstraint
} from "./../controllers/constraint.controller.ts";

const router = express.Router();


router.get("/:id", getThisConstraint);



export default router;