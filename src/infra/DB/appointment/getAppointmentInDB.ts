import { AppointmentDTO } from "../../../domain/entities/appointment/appointmentDTO";
import { CostumerPhone } from "../../../domain/entities/costumer/phone";
import { NotFoundError } from "../../../errors/notFoundError";
import { prisma } from "../../prisma";


export async function GetAppointmentInDB(appointmentID: string): Promise<AppointmentDTO | NotFoundError>{

    try {

        const appointment = await prisma.appointment.findFirstOrThrow({where: {id: appointmentID}})
        const costumerPhone = await prisma.costumerPhone.findFirstOrThrow({where: {phone: appointment.Phone}})
        
        return new AppointmentDTO(appointment.id, costumerPhone, appointment.arrival)
        
    } catch (error) {
        
        return new NotFoundError((error as Error).message)

    }

}