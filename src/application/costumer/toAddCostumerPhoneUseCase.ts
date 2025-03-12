import { CostumerPhone } from "../../domain/entities/costumer/phone";
import { ICostumerRepository } from "../../domain/usecases/CostumerRepository";
import { InvalidPhoneError } from "../../errors/invalidPhoneError";

export class toAddCostumerPhoneUseCase{

    costumerRepo: ICostumerRepository

    constructor(costumerRepo: ICostumerRepository){
        this.costumerRepo = costumerRepo
    }

    async add(phone: number): Promise<CostumerPhone | InvalidPhoneError>{

        if(await this.costumerRepo.getPhone(phone) instanceof CostumerPhone){
            return new InvalidPhoneError("The customer number has already been registered")
        }

        if(phone.toPrecision().length === 9){

            const costumerPhone = new CostumerPhone(phone, false)

            return await this.costumerRepo.addPhone(costumerPhone)
        }

        return new InvalidPhoneError("The customer number must contain nine numbers")

    }

}