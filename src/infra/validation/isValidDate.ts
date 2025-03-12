import { InvalidDateError } from "../../errors/invalidDateError";
import { prisma } from "../prisma";

export async function isValidDate(date: Date): Promise<Boolean | InvalidDateError>{

    const dates: Date[] = []

    const dateGetTime = Date.parse(date.toString())
    
    if(dateGetTime <= (Date.now() + 3599999 )){
        return new InvalidDateError("The date must be at least one hour after the current time")
    }

    const appointments = (await prisma.appointment.findMany()).forEach((date) => {
        return dates.push(date.arrival)
    })

    for(let i = 0; i < dates.length; i++){

        if((dateGetTime - dates[i].getTime()) / 3599999 >= 0 && (dateGetTime - dates[i].getTime()) / 3599999 < 1){
            return new InvalidDateError(`It has to be at least an hour before or an hour after ${dates[i].toLocaleTimeString()}`)
        }

        if(dateGetTime - dates[i].getTime() >= -3599999 && dateGetTime - dates[i].getTime() < 0){
            return new InvalidDateError(`It has to be at least an hour before ${dates[i].toLocaleTimeString()}`)
        }

    }

    return true
}