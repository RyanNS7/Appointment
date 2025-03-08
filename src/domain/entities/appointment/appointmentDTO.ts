import { CostumerPhone } from "../costumer/phone"

export class AppointmentDTO{
    id: string
    phone: CostumerPhone
    arrival: Date

    constructor(id: string, phone: CostumerPhone, arrival: Date){
        this.id = id
        this.phone = phone
        this.arrival = arrival
    }
}