import { CostumerPhone } from "../../../domain/entities/costumer/phone";
import { NotFoundError } from "../../../errors/notFoundError";
import { prisma } from "../../prisma";

export async function GetPhoneInDB(phone: number): Promise<CostumerPhone | NotFoundError>{

    try {
        const costumerPhone = await prisma.costumerPhone.findUniqueOrThrow({where: {phone}})

        return new CostumerPhone((costumerPhone as {phone: number}).phone , (costumerPhone as {validated: boolean}).validated)
        
    } catch (error) {

        return new NotFoundError((error as {name: string}).name)
    }

}