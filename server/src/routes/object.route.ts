import express from "express";

import {
    getThisObject
} from "./../controllers/object.controller.ts";

const router = express.Router();


router.get("/:id", getThisObject);



export default router;