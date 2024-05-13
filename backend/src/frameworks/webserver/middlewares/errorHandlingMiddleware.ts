import { Request, Response, NextFunction } from "express";

const errorHandlingMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandlingMiddleware;
