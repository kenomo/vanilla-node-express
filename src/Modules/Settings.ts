import * as core from "express-serve-static-core";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "jet-logger";
import { StatusCodes } from "http-status-codes";


const { BAD_REQUEST } = StatusCodes;

const Settings = (app: core.Express) => {

    //----------------------------------------------------------------------------------------------------------------------
    // Basic settings.

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());

    // Show routes called in console during development: HTTP request logger middleware for node.js.
    if (app.get("env") === "development") {
        app.use(morgan("dev"));
    }

    // Security: Helmet helps you secure your Express apps by setting various HTTP headers.
    if (app.get("env") === "production") {
        app.use(helmet());
    }


    //----------------------------------------------------------------------------------------------------------------------
    // CORS, bodyParser, print API errors.

    if (process.env.FRONTEND_URL) {
        // Enable Cors.
        if (app.get("env") === "development") {
            app.use(cors({
                origin: process.env.FRONTEND_URL,
                credentials: true
            }));
        } else if (app.get("env") === "production") {
            app.use(cors({
                origin: process.env.FRONTEND_URL,
                credentials: true
            }));
        }
    }

    // Use body-parser.
    // Support parsing of application/json type post data.
    app.use(bodyParser.json());
    // Support parsing of application/x-www-form-urlencoded post data.
    app.use(bodyParser.urlencoded({ extended: true }));

    // Print API errors.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        logger.err(err, true);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    });

}
export default Settings;