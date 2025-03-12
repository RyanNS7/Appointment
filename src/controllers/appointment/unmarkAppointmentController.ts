import { UnMarkAppointmentUseCase } from "../../application/appointment/unmarkAppointmentUseCase"
import { IAppointmentRepository } from "../../domain/usecases/AppointmentRepository"
import { NotFoundError } from "../../errors/notFoundError"
import { HttpRequest } from "../../http/httpRequest"
import { HttpResponse } from "../../http/httpResponse"
import { internalServerError, notFound, ok } from "../../http/statusCode/statusCode"

export class UnMarkAppointmentController{
    appointmentRepo: IAppointmentRepository

    constructor(appointmentRepo: IAppointmentRepository){
        this.appointmentRepo = appointmentRepo
    }

    async unmark(httpRequest: HttpRequest): Promise<HttpResponse>{

        try {

            const unmark = await new UnMarkAppointmentUseCase(this.appointmentRepo).unmark((httpRequest.body as {appointmentID: string}).appointmentID)

            if(unmark instanceof NotFoundError){
                return notFound(unmark.message)
            }

            return ok(unmark)

            
        } catch (error) {
            return internalServerError(error)
        }

    }
}