import express from "express";
import cors from "cors";
import "dotenv/config";
import { logErrors } from "./middlewares/logErrors.ts";
import chapterRouter from "./routes/chapter.route.ts";
import effectRouter from "./routes/effect.route.ts";
import constraintRouter from "./routes/constraint.route.ts";
import objectRouter from "./routes/object.route.ts";
import fightRouter from "./routes/fight.route.ts";
import targetRouter from "./routes/target.route.ts";


const app = express();

// Get the port from the environment variables
const port = process.env.APP_PORT;

// Use cors to allow our client url (in env variables) to query our back
if (process.env.CLIENT_URL != null) {
    app.use(cors({ origin: process.env.CLIENT_URL }));
}

/* ************************************************************************* */
// Request Parsing (explications dans mono repo)
app.use(express.json());
/* ************************************************************************* */

app.use("/api/chapters", chapterRouter);
app.use("/api/effects", effectRouter);
app.use("/api/constraints", constraintRouter);
app.use("/api/objects", objectRouter);
app.use("/api/fights", fightRouter);
app.use("/api/targets", targetRouter);


// Mount the logErrors middleware globally
app.use(logErrors);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.info(`Server is listening on port ${port}`);
}).on("error", (err: Error) => {
    console.error("Error:", err.message);
});
