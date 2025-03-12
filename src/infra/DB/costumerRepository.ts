import { CostumerAddress } from "../../domain/entities/costumer/address";
import { CostumerAddressDTO } from "../../domain/entities/costumer/addressDTO";
import { CostumerPhone } from "../../domain/entities/costumer/phone";
import { ICostumerRepository } from "../../domain/usecases/CostumerRepository";
import { InvalidAddressError } from "../../errors/invalidAddressError";
import { InvalidPhoneError } from "../../errors/invalidPhoneError";
import { NotFoundError } from "../../errors/notFoundError";
import { AddAddressInDB } from "./costumer/addAddressInDB";
import { AddPhoneInDB } from "./costumer/addPhoneInDB";
import { GetPhoneInDB } from "./costumer/getPhoneInDB";
import { validatePhoneInDB } from "./costumer/validatePhoneInDB";

export class CostumerRepository implements ICostumerRepository{
    async addAddress(address: CostumerAddress): Promise<CostumerAddressDTO | InvalidAddressError> {
        return await AddAddressInDB(address)
    }

    async addPhone(phone: CostumerPhone): Promise<CostumerPhone | InvalidPhoneError> {
        return await AddPhoneInDB(phone.phone)
    }

    async getPhone(phone: number): Promise<CostumerPhone | NotFoundError> {
        return await GetPhoneInDB(phone)
    }

    async validatePhone(phone: number): Promise<CostumerPhone | NotFoundError> {
        return await validatePhoneInDB(phone)
    }
}