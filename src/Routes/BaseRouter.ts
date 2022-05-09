import { Router } from "express";


// Init router and path.
const BaseRouter = Router();

// Add sub-routes.
BaseRouter.use("/test", (req, res) => {
    res.send(req.originalUrl);
});

// Export the base-router.
export default BaseRouter;