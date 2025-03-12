import { NotFoundError } from "../../../errors/notFoundError";
import { prisma } from "../../prisma";


export async function UnMarkAppointmentInDB(appointmentID: string): Promise<Boolean | NotFoundError>{

    try {
        const unmark = await prisma.appointment.delete({where: {id: appointmentID}})
        
        return true
        
    } catch (error) {
        
        return new NotFoundError((error as Error).message)

    }

}