import { GetAppointmentUseCase } from "../../application/appointment/getAppointmentUseCase"
import { IAppointmentRepository } from "../../domain/usecases/AppointmentRepository"
import { NotFoundError } from "../../errors/notFoundError"
import { HttpRequest } from "../../http/httpRequest"
import { HttpResponse } from "../../http/httpResponse"
import { internalServerError, notFound, ok } from "../../http/statusCode/statusCode"

export class GetAppointmentController{
    appointmentRepo: IAppointmentRepository

    constructor(appointmentRepo: IAppointmentRepository){
        this.appointmentRepo = appointmentRepo
    }

    async get(httpRequest: HttpRequest): Promise<HttpResponse>{

        try {

            const getAppointment = await new GetAppointmentUseCase(this.appointmentRepo).get((httpRequest.body as {appointmentID: string}).appointmentID)

            if(getAppointment instanceof NotFoundError){
                return notFound(getAppointment.message)
            }

            return ok(getAppointment)

            
        } catch (error) {
            return internalServerError(error)
        }

    }
}