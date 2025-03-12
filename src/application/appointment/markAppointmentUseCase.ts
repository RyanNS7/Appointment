import { Appointment } from "../../domain/entities/appointment/appointment";
import { AppointmentDTO } from "../../domain/entities/appointment/appointmentDTO";
import { CostumerPhone } from "../../domain/entities/costumer/phone";
import { IAppointmentRepository } from "../../domain/usecases/AppointmentRepository";
import { ICostumerRepository } from "../../domain/usecases/CostumerRepository";
import { AppointmentCreationError } from "../../errors/appointmentCreationError";
import { InvalidDateError } from "../../errors/invalidDateError";
import { NotFoundError } from "../../errors/notFoundError";


export class MarkAppointmentUseCase{

    costumerRepo: ICostumerRepository
    appointmentRepo: IAppointmentRepository

    constructor(costumerRepo: ICostumerRepository, appointmentRepo: IAppointmentRepository){
        this.appointmentRepo = appointmentRepo
        this.costumerRepo = costumerRepo
    }

    async mark(phone: number, arrival: Date): Promise<AppointmentDTO | NotFoundError | AppointmentCreationError | InvalidDateError>{

        const costumerPhone = await this.costumerRepo.getPhone(phone)

        if((costumerPhone as CostumerPhone).validated === false){
            return new AppointmentCreationError("The consumer's phone number must be valid before creating the appointment.")
        }

        const arrivalAppointment = await this.appointmentRepo.isValidDate(arrival)

        if(costumerPhone instanceof NotFoundError){
            return costumerPhone
        }

        if(arrivalAppointment instanceof InvalidDateError){
            return arrivalAppointment
        }

        const appointment = new Appointment(costumerPhone, arrival)
        const appointmentMarked = await this.appointmentRepo.mark(appointment)

        if(appointmentMarked instanceof AppointmentCreationError){
            return appointmentMarked
        }

        return appointmentMarked

    }
}