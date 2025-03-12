import { IAppointmentRepository } from "../../domain/usecases/AppointmentRepository"
import { NotFoundError } from "../../errors/notFoundError"


export class UnMarkAppointmentUseCase{

    appointmentRepo: IAppointmentRepository

    constructor(appointmentRepo: IAppointmentRepository){
        this.appointmentRepo = appointmentRepo
    }

    async unmark(appointmentID: string): Promise<Boolean | NotFoundError>{

        const appointment = await this.appointmentRepo.getAppointment(appointmentID)

        if(appointment instanceof NotFoundError){
            return appointment
        }

        const appointmentUnmarked =  await this.appointmentRepo.unmark(appointmentID)

        return appointmentUnmarked
    }
}