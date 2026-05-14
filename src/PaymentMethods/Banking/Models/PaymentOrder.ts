import { IRequest, ServiceParameter } from '../../../Models';

export interface IPaymentOrder extends IRequest {
    amountCredit: number;
    accountHolderName: string;
    iban: string;
    processingDate?: string;
    bic?: string;
    purpose?: string;
    structuredIssuerType?: string;
    structuredReference?: string;
}

export class PaymentOrder extends ServiceParameter {
    set accountHolderName(value: string) {
        this.set('AccountHolderName', value);
    }

    set iban(value: string) {
        this.set('IBAN', value);
    }

    set processingDate(value: string) {
        this.set('ProcessingDate', value);
    }

    set bic(value: string) {
        this.set('BIC', value);
    }

    set purpose(value: string) {
        this.set('Purpose', value);
    }

    set structuredIssuerType(value: string) {
        this.set('StructuredIssuerType', value);
    }

    set structuredReference(value: string) {
        this.set('StructuredReference', value);
    }
}