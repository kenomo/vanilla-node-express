import logger from "jet-logger";
import {NextFunction, Request, Response} from "express";
import StatusCodes from "http-status-codes";
import Deltas from "@config/Config";


const { INTERNAL_SERVER_ERROR, BAD_REQUEST, OK, FORBIDDEN } = StatusCodes;


export default class Middlewares {

    static access(req: Request, res: Response, next: NextFunction) {

        let hasAccess: boolean = true;

        if (hasAccess) {
            return next();
        } else {
            return res.status(FORBIDDEN).send();
        }

    }

}
