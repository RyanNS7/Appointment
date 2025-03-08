import { BaseError } from "./BaseError";

export class InvalidPhoneError extends BaseError{

    constructor(message: string){
        super(message)
    }
}