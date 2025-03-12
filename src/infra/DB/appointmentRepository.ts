import { Appointment } from "../../domain/entities/appointment/appointment";
import { AppointmentDTO } from "../../domain/entities/appointment/appointmentDTO";
import { IAppointmentRepository } from "../../domain/usecases/AppointmentRepository";
import { AppointmentCreationError } from "../../errors/appointmentCreationError";
import { InvalidDateError } from "../../errors/invalidDateError";
import { NotFoundError } from "../../errors/notFoundError";
import { isValidDate } from "../validation/isValidDate";
import { GetAppointmentInDB } from "./appointment/getAppointmentInDB";
import { MarkAppointmentInDB } from "./appointment/markAppointmentInDB";
import { UnMarkAppointmentInDB } from "./appointment/unmarkAppointmentInDB";

export class AppointmentRepository implements IAppointmentRepository{
    async mark(appointment: Appointment): Promise<AppointmentDTO | AppointmentCreationError> {
        return await MarkAppointmentInDB(appointment)
    }

    async getAppointment(appointmentID: string): Promise<NotFoundError | AppointmentDTO> {
        return await GetAppointmentInDB(appointmentID)
    }

    async unmark(appointmentID: string): Promise<Boolean | NotFoundError> {
        return await UnMarkAppointmentInDB(appointmentID)
    }

    async isValidDate(date: Date): Promise<Boolean | InvalidDateError> {
        return await isValidDate(date)
    }
}