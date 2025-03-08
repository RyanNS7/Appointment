import { BaseError } from "./BaseError";

export class InvalidAddressError extends BaseError{

    constructor(message: string){
        super(message)
    }
}