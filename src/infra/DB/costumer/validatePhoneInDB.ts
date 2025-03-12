import { CostumerPhone } from "../../../domain/entities/costumer/phone"
import { NotFoundError } from "../../../errors/notFoundError"
import { prisma } from "../../prisma"


export async function validatePhoneInDB(phone: number): Promise<CostumerPhone | NotFoundError>{

    try {

        const costumerPhone = await prisma.costumerPhone.update({where: {phone}, data: {validated: true}})

        return costumerPhone        
        
    } catch (error) {

        return new NotFoundError((error as Error).message)
        
    }

}