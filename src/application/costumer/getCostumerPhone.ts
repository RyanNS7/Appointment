import { CostumerPhone } from "../../domain/entities/costumer/phone"
import { ICostumerRepository } from "../../domain/usecases/CostumerRepository"
import { NotFoundError } from "../../errors/notFoundError"

export class GetCostumerPhoneUseCase{

    costumerRepo: ICostumerRepository

    constructor(costumerRepo: ICostumerRepository){
        this.costumerRepo = costumerRepo
    }

    async get(phone: number): Promise<NotFoundError | CostumerPhone>{

        const getCostumerPhone = await this.costumerRepo.getPhone(phone)

        if( getCostumerPhone instanceof NotFoundError){
            return getCostumerPhone
        }

        return await this.costumerRepo.getPhone(phone)

    }
}