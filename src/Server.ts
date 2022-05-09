import express from "express";
import "express-async-errors";
import BaseRouter from "@routes/BaseRouter";
import Settings from "@modules/Settings";
import Session from "@modules/Session";


const app = express();

// Modules.
Settings(app);
Session(app);

// Routes.
app.use("/test", (req, res) => {
    res.send(req.originalUrl);
});
app.use("/api", BaseRouter);

// Export express instance.
export default app;