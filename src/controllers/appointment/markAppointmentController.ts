import { MarkAppointmentUseCase } from "../../application/appointment/markAppointmentUseCase"
import { IAppointmentRepository } from "../../domain/usecases/AppointmentRepository"
import { ICostumerRepository } from "../../domain/usecases/CostumerRepository"
import { AppointmentCreationError } from "../../errors/appointmentCreationError"
import { InvalidDateError } from "../../errors/invalidDateError"
import { NotFoundError } from "../../errors/notFoundError"
import { HttpRequest } from "../../http/httpRequest"
import { HttpResponse } from "../../http/httpResponse"
import { badRequest, created, internalServerError, notFound } from "../../http/statusCode/statusCode"

export class MarkAppointmentController{

    costumerRepo: ICostumerRepository
    appointmentRepo: IAppointmentRepository

    constructor(costumerRepo: ICostumerRepository, appointmentRepo: IAppointmentRepository){
        this.appointmentRepo = appointmentRepo
        this.costumerRepo = costumerRepo
    }

    async mark(request: HttpRequest): Promise<HttpResponse>{

        const appointment = {
            phone: (request.body as {phone: number}).phone,
            arrival: (request.body as {arrival: Date}).arrival
        }
        
        try {

            const markAppointment = await new MarkAppointmentUseCase(this.costumerRepo, this.appointmentRepo).mark(appointment.phone, appointment.arrival)

            if(markAppointment instanceof NotFoundError){
                return notFound(markAppointment.message)
            }

            if(markAppointment instanceof InvalidDateError){
                return badRequest(markAppointment.message)
            }

            if(markAppointment instanceof AppointmentCreationError){
                return badRequest(markAppointment.message)
            }

            return created(markAppointment)
            
        } catch (error) {
            return internalServerError(error)
        }

    }
}