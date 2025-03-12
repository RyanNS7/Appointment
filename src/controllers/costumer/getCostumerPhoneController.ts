import { GetCostumerPhoneUseCase } from "../../application/costumer/getCostumerPhoneUseCase"
import { ICostumerRepository } from "../../domain/usecases/CostumerRepository"
import { NotFoundError } from "../../errors/notFoundError"
import { HttpRequest } from "../../http/httpRequest"
import { HttpResponse } from "../../http/httpResponse"
import { internalServerError, notFound, ok } from "../../http/statusCode/statusCode"

export class GetCostumerPhoneController{
    
    costumerRepo: ICostumerRepository

    constructor(costumerRepo: ICostumerRepository){
        this.costumerRepo = costumerRepo
    }

    async get(httpRequest: HttpRequest): Promise<HttpResponse>{
        
        try {

            const costumerPhone = await new GetCostumerPhoneUseCase(this.costumerRepo).get((httpRequest.body as {phone: number}).phone)

            if(costumerPhone instanceof NotFoundError){
                return notFound(costumerPhone.message)
            }

            return ok(costumerPhone)
            
        } catch (error) {
            return internalServerError(error)
        }
    }
}