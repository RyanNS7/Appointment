import { CostumerPhone } from "../costumer/phone"

export class Appointment{

    phone: CostumerPhone
    arrival: Date

    constructor(phone: CostumerPhone, arrival: Date){
        this.phone = phone
        this.arrival = arrival
    }

}