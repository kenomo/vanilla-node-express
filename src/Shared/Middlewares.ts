import { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";


const { FORBIDDEN } = StatusCodes;

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
