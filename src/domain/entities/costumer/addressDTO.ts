import { IAddress } from "./address";
import { CostumerPhone } from "./phone";

export class CostumerAddressDTO extends CostumerPhone{

    id: string
    address: IAddress

    constructor(costumer: CostumerPhone, address: IAddress, id: string){
        super(costumer.phone, costumer.validated)
        this.address = address
        this.id = id
    }
}