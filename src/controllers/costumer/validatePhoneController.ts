import { validatePhoneUseCase } from "../../application/costumer/validatePhoneUseCase"
import { ICostumerRepository } from "../../domain/usecases/CostumerRepository"
import { NotFoundError } from "../../errors/notFoundError"
import { HttpRequest } from "../../http/httpRequest"
import { HttpResponse } from "../../http/httpResponse"
import { internalServerError, notFound, ok } from "../../http/statusCode/statusCode"

export class validatePhoneController{
    
    costumerRepo: ICostumerRepository

    constructor(costumerRepo: ICostumerRepository){
        this.costumerRepo = costumerRepo
    }

    async validate(httpRequest: HttpRequest): Promise<HttpResponse>{
        
        try {

            const costumerPhone = await new validatePhoneUseCase(this.costumerRepo).validate((httpRequest.body as {phone: number}).phone)

            if(costumerPhone instanceof NotFoundError){
                return notFound(costumerPhone.message)
            }

            return ok(costumerPhone)
            
        } catch (error) {
            return internalServerError(error)
        }
    }
}