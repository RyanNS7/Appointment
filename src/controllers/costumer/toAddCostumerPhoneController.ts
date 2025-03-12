import { toAddCostumerPhoneUseCase } from "../../application/costumer/toAddCostumerPhoneUseCase";
import { ICostumerRepository } from "../../domain/usecases/CostumerRepository";
import { InvalidPhoneError } from "../../errors/invalidPhoneError";
import { HttpRequest } from "../../http/httpRequest";
import { HttpResponse } from "../../http/httpResponse";
import { badRequest, created, internalServerError } from "../../http/statusCode/statusCode";

export class ToAddCostumerPhoneController{

    costumerRepo: ICostumerRepository

    constructor(costumerRepo: ICostumerRepository){
        this.costumerRepo = costumerRepo
    }

    async add(httpRequest: HttpRequest): Promise<HttpResponse>{

        try {

            const costumerPhone = await new toAddCostumerPhoneUseCase(this.costumerRepo).add((httpRequest.body as {phone: number}).phone)

            if(costumerPhone instanceof InvalidPhoneError){
                return badRequest(costumerPhone.message)
            }

            return created(costumerPhone)
            
        } catch (error) {
            return internalServerError(error)
        }

    }

}