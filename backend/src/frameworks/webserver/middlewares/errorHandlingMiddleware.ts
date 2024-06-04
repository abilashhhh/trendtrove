// import { Request, Response, NextFunction } from "express";

// const errorHandlingMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
//     console.error("Error from errorHandlingMiddleware:", err);
//     res.status(500).json({ message: "Internal Server Error" });
// };

// export default errorHandlingMiddleware;

import { NextFunction, Request, Response } from "express";
import ErrorInApplication from '../../../utils/ErrorInApplication';

const errorHandlingMiddleware = (
    err: ErrorInApplication | Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error("Error from errorHandlingMiddleware:", err);

    let statusCode = err instanceof ErrorInApplication ? err.statusCode : 500;
    let status = err instanceof ErrorInApplication ? err.status : 'error';
    let message = err instanceof ErrorInApplication ? err.message : 'An unexpected error occurred';

    res.status(statusCode).json({ status, message });
};

export default errorHandlingMiddleware;
