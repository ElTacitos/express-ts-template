import cors from "cors";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error-middleware";
import express, { Express } from "express";
import { json } from "body-parser";
import { mainRouter } from "./routers/main";
import morgan from "morgan";
import { router } from "./routers/socket-io";
import { Server } from "http";
import { Server as SocketIoServer } from "socket.io";

dotenv.config();

const SERVER_PORT = 8081;
export let io: SocketIoServer;

export function setupHttpServer(
    app: Express,
    port = Number(process.env.PORT ?? SERVER_PORT)
): Server {
    return app.listen(port, (): void => {
        console.log(`Server started at http://localhost:${port}`);
    });
}

export function setupRouter(app: Express): void {
    app.use(cors({ origin: ["*"] }));
    app.use(json());
    app.use(morgan("common"));
    app.use("/", mainRouter);
    app.use(errorMiddleware);
}

export function setupSocketIoServer(server: Server): void {
    io = new SocketIoServer(server, { cors: { origin: "*" } });
    io.on("connection", router);
}

export function run(): void {
    const app: Express = express();
    setupRouter(app);
    const server = setupHttpServer(app);
    setupSocketIoServer(server);
}
