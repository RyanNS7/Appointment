import { AppointmentDTO } from "../../domain/entities/appointment/appointmentDTO"
import { IAppointmentRepository } from "../../domain/usecases/AppointmentRepository"
import { NotFoundError } from "../../errors/notFoundError"

export class GetAppointmentUseCase{

    appointmentRepo: IAppointmentRepository

    constructor(appointmentRepo: IAppointmentRepository){
        this.appointmentRepo = appointmentRepo
    }

    async get(appointmentID: string): Promise<AppointmentDTO | NotFoundError>{

        const appointment = await this.appointmentRepo.getAppointment(appointmentID)

        if(appointment instanceof NotFoundError){
            return appointment
        }

        return appointment

    }
}