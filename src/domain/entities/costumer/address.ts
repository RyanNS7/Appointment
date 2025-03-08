import { CostumerPhone } from "./phone";

export interface IAddress{
    district: string
    street: string
    house_number: number | null
}

export class CostumerAddress extends CostumerPhone{

    address: IAddress

    constructor(costumer: CostumerPhone, address: IAddress){
        super(costumer.phone, costumer.validated)
        this.address = address
    }
}