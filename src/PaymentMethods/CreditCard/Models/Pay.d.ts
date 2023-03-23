import { Payload } from '../../../Models/ITransaction';
export interface IEncrypted extends Payload {
    encryptedCardData: string;
}
export interface ISecurityCodePay extends Payload {
    encryptedSecurityCode: string;
}
