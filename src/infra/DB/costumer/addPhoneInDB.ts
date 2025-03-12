import { CostumerPhone } from "../../../domain/entities/costumer/phone";
import { InvalidPhoneError } from "../../../errors/invalidPhoneError";
import { prisma } from "../../prisma";

export async function AddPhoneInDB(phone: number): Promise<InvalidPhoneError | CostumerPhone>{

    try {
        const costumerPhone = await prisma.costumerPhone.create({data: {phone, validated: false}})

        return costumerPhone

    } catch (error) {

        return new InvalidPhoneError((error as Error).message)
    }

}