import express from "express";
import "express-async-errors";
import BaseRouter from "@routes/BaseRouter";
import Settings from "@modules/Settings";
import Session from "@modules/Session";
import { StatusCodes } from "http-status-codes";


const { INTERNAL_SERVER_ERROR } = StatusCodes;
const app: express.Express = express();


Settings(app);
Session(app);

// Routes.
app.use(BaseRouter);

// Export express instance.
export default app;