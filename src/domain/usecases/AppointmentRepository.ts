import { AppointmentCreationError } from "../../errors/appointmentCreationError";
import { NotFoundError } from "../../errors/notFoundError";
import { Appointment } from "../entities/appointment/appointment";
import { AppointmentDTO } from "../entities/appointment/appointmentDTO";

export interface IAppointmentRepository{
    mark(appointment: Appointment): Promise<AppointmentDTO | AppointmentCreationError>
    unmark(appointmentID: string): Promise<Boolean | NotFoundError>
    getAppointment(appointmentID: string): Promise<AppointmentDTO | NotFoundError>
}