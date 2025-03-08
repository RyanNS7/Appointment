import { InvalidAddressError } from "../../errors/invalidAddressError";
import { InvalidPhoneError } from "../../errors/invalidPhoneError";
import { NotFoundError } from "../../errors/notFoundError";
import { CostumerAddress } from "../entities/costumer/address";
import { CostumerAddressDTO } from "../entities/costumer/addressDTO";
import { CostumerPhone } from "../entities/costumer/phone";

export interface ICostumerRepository{
    addPhone(phone: CostumerPhone): Promise<CostumerPhone | InvalidPhoneError>
    addAddress(address: CostumerAddress): Promise<CostumerAddressDTO | InvalidAddressError>
    validatePhone(phone: number): Promise<CostumerPhone | NotFoundError>
    getPhone(phone: number): Promise<CostumerPhone | NotFoundError>
}