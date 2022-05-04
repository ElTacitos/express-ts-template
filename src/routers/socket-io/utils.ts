import { Socket } from "socket.io";

export function getSocketIp(socket: Socket): string {
    let socketIp = "";

    switch (process.env.NODE_ENV) {
        case "prod":
        case "preprod":
            socketIp = socket.handshake.headers["x-real-ip"] as string;
            break;
        default:
            socketIp = "127.0.0.1";
            break;
    }

    return socketIp;
}

const clientsIp: string[] = [];

export function onClientConnected(socket: Socket): void {
    const IP = getSocketIp(socket);

    if (!clientsIp.includes(IP)) {
        socket.emit("refresh", (): void => {
            clientsIp.push(IP);
        });
    }
}
