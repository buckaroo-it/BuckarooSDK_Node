import { IPaymentRequest, IRequest, ServiceParameter } from '../../../Models';

export interface IPay extends IPaymentRequest {
    saveToken?: boolean;
}

export interface IPayEncrypted extends IPaymentRequest {
    encryptedCardData: string;
}

export interface IPayComplete extends IRequest {
    encryptedCardData: string;
    originalTransactionKey: string;
}

export interface IPayOneClick extends IRequest {
    originalTransactionKey: string;
    amountDebit: number;
}

export class Pay extends ServiceParameter {
    set encryptedCardData(value: string) {
        this.set('encryptedCardData', value);
    }

    set saveToken(value: boolean) {
        this.set('saveToken', value);
    }
}
