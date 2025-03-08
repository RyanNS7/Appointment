import { BaseError } from "./BaseError";

export class AppointmentCreationError extends BaseError{

    constructor(message: string){
        super(message)
    }
}