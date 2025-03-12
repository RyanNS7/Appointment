import { CostumerAddress } from "../../../domain/entities/costumer/address";
import { CostumerAddressDTO } from "../../../domain/entities/costumer/addressDTO";
import { CostumerPhone } from "../../../domain/entities/costumer/phone";
import { InvalidAddressError } from "../../../errors/invalidAddressError";
import { prisma } from "../../prisma";


export async function AddAddressInDB(costumerAddress: CostumerAddress): Promise<CostumerAddressDTO | InvalidAddressError> {
    
    try {
        
        const address = await prisma.address.create({data: {district: costumerAddress.address.district, street: costumerAddress.address.street, house_number: costumerAddress.address.house_number, Phone: costumerAddress.phone}})

        const costumerInfo = {
            costumerPhone: new CostumerPhone(address.Phone, costumerAddress.validated),
            address: {district: address.district, street: address.street, house_number: address.house_number}
        }

        return new CostumerAddressDTO(costumerInfo.costumerPhone, costumerInfo.address, address.id)

    } catch (error) {

        return new InvalidAddressError((error as Error).message)
        
    }

}