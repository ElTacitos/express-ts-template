import { ECode, HttpError } from "../routers/utils";
import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: { data?: any; message: string } = { message: err.message };

    if (err instanceof HttpError) {
        res.status(err.code);
        body.data = err.data;
    } else {
        res.status(ECode.Error);
    }

    res.json(body);
}
