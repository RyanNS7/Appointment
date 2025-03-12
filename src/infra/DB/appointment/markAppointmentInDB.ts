import { Appointment } from "../../../domain/entities/appointment/appointment";
import { AppointmentDTO } from "../../../domain/entities/appointment/appointmentDTO";
import { CostumerPhone } from "../../../domain/entities/costumer/phone";
import { AppointmentCreationError } from "../../../errors/appointmentCreationError";
import { prisma } from "../../prisma";


export async function MarkAppointmentInDB(appointment: Appointment): Promise<AppointmentDTO | AppointmentCreationError>{

    try {

        const createAppointment = await prisma.appointment.create({data: {arrival: appointment.arrival, Phone: appointment.phone.phone}})

        return new AppointmentDTO(createAppointment.id, new CostumerPhone(createAppointment.Phone, appointment.phone.validated), createAppointment.arrival)
    
    } catch (error) {
        
        return new AppointmentCreationError((error as Error).message)

    }

}