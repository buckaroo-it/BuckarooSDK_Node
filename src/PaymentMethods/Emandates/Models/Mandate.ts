import { ServiceParameter } from '../../../Models/ServiceParameters';
import IRequest from '../../../Models/IRequest';

export interface IMandate extends IRequest {
    mandateId?: string;
    debtorBankId?: string;
    debtorReference?: string;
    sequenceType?: 0 | 1;
    purchaseId?: string;
    language?: string;
    emandateReason?: string;
    maxAmount?: number;
    originalMandateId?: string;
}

export class Mandate extends ServiceParameter {
    set debtorBankId(value: string) {
        this.set('debtorBankId', value);
    }
    set debtorReference(value: string) {
        this.set('debtorReference', value);
    }
    set sequenceType(value: number) {
        this.set('sequenceType', value);
    }
    set purchaseId(value: string) {
        this.set('purchaseId', value);
    }
    set mandateId(value: string) {
        this.set('mandateId', value);
    }
    set language(value: string) {
        this.set('language', value);
    }
    set emandateReason(value: string) {
        this.set('emandateReason', value);
    }
    set maxAmount(value: number) {
        this.set('maxAmount', value);
    }
    set originalMandateId(value: string) {
        this.set('originalMandateId', value);
    }
}
