import { IDict } from "../utils/interfaces";

export enum ECode {
    Ok = 200,
    BadRequest = 400,
    Forbidden = 403,
    NotFound = 404,
    Error = 500,
}

export enum ECrud {
    Create = "CREATE",
    Read = "READ",
    Update = "UPDATE",
    Delete = "DELETE",
}

export class HttpError extends Error {
    public code: number;
    public data: IDict;

    public constructor(code: number, message: string, data: IDict = {}) {
        super(message);
        this.code = code;
        this.data = data;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}
