/* eslint-disable @typescript-eslint/no-misused-promises */
import { NextFunction, Request, Response, Router } from "express";

// eslint-disable-next-line new-cap
const mainRouter = Router();

mainRouter.get("/", (req: Request, res: Response, next: NextFunction): void => {
    try {
        res.json({ status: "OK" });
        next();
    } catch (err) {
        next(err);
    }
});

mainRouter.get(
    "/db",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log("/db");
    }
);

export { mainRouter };
