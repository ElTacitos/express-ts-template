import { onClientConnected } from "./utils";
import { Socket } from "socket.io";

export function router(socket: Socket): void {
    onClientConnected(socket);
}
