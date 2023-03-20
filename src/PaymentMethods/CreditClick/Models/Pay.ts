import {Payload} from "../../../Models/ITransaction";

export interface Pay extends Payload {
    costumer?: {
        firstName?: string
        lastName?: string
        email?: string
    }
}