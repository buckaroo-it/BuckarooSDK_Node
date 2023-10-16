import { IPaymentRequest } from '../../../Models/IRequest';
import { ServiceParameter } from '../../../Models/ServiceParameters';

export default interface IPay extends IPaymentRequest {
    fashionChequeCardNumber?: string;
    fashionChequePin?: string;
    intersolveCardnumber?: string;
    intersolvePIN?: string;
    tcsCardnumber?: string;
    tcsValidationCode?: string;
    lastName?: string;
    email?: string;
    cardNumber?: string;
    pin?: string;
}

export class Pay extends ServiceParameter {
    set fashionChequeCardNumber(value: string) {
        this.set('fashionChequeCardNumber', value);
    }

    set fashionChequePin(value: string) {
        this.set('fashionChequePin', value);
    }

    set intersolveCardnumber(value: string) {
        this.set('intersolveCardnumber', value);
    }

    set intersolvePIN(value: string) {
        this.set('intersolvePIN', value);
    }

    set tcsCardnumber(value: string) {
        this.set('tcsCardnumber', value);
    }

    set tcsValidationCode(value: string) {
        this.set('tcsValidationCode', value);
    }

    set lastName(value: string) {
        this.set('lastName', value);
    }

    set email(value: string) {
        this.set('email', value);
    }

    set cardNumber(value: string) {
        this.set('cardNumber', value);
    }

    set pin(value: string) {
        this.set('pin', value);
    }

    set issuer(value: string) {
        this.set('issuer', value);
    }
}
