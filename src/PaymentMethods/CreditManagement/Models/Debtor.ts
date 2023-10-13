import { IInvoice, Invoice } from './Invoice';

export interface IDebtor extends IInvoice {
    addressUnreachable?: boolean;

    emailUnreachable?: boolean;

    mobileUnreachable?: boolean;

    landlineUnreachable?: boolean;

    faxUnreachable?: boolean;
}
export class Debtor extends Invoice {
    set addressUnreachable(value: boolean) {
        this.set('addressUnreachable', value);
    }
    set emailUnreachable(value: boolean) {
        this.set('emailUnreachable', value);
    }
    set mobileUnreachable(value: boolean) {
        this.set('mobileUnreachable', value);
    }
    set landlineUnreachable(value: boolean) {
        this.set('landlineUnreachable', value);
    }
    set faxUnreachable(value: boolean) {
        this.set('faxUnreachable', value);
    }
}
