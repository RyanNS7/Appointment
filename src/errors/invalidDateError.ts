import { BaseError } from "./BaseError";

export class InvalidDateError extends BaseError{
    constructor(message: string){
        super(message)
    }
}