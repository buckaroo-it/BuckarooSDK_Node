import {ITransaction, Payload} from "../../../Models/ITransaction";

export interface IPay extends Payload {
    saveToken?:boolean
}
export interface IPayEncrypted extends Payload {
    encryptedCardData:string
}
export interface IPayComplete extends ITransaction {
    encryptedCardData:string
    originalTransactionKey:string
}

export interface IPayOneClick extends ITransaction {
    originalTransactionKey:string
    amountDebit:number
}
