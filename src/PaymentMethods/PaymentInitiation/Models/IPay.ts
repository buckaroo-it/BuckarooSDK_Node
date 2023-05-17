import {Payload} from "../../../Models/ITransaction";

export default interface IPay extends Payload {
    issuer: string
    countryCode: string
}