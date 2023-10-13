import { Model } from '../../../Models/Model';

export type IConfiguration = {
    name?: string;
    schemeKey?: string;
    invoiceNumberPrefix?: string;
    invoiceDescriptionFormat?: string;
    dueDateDays?: number;
    allowedServices?: string;
    generateInvoiceSpecification?: boolean;
    skipPayPerEmail?: boolean;
};
export class Configuration extends Model implements IConfiguration {
    set name(value: string) {
        this.set('name', value);
    }
    set schemeKey(value: string) {
        this.set('schemeKey', value);
    }
    set invoiceNumberPrefix(value: string) {
        this.set('invoiceNumberPrefix', value);
    }

    set invoiceDescriptionFormat(value: string) {
        this.set('invoiceDescriptionFormat', value);
    }

    set dueDateDays(value: number) {
        this.set('dueDateDays', value);
    }

    set allowedServices(value: string) {
        this.set('allowedServices', value);
    }

    set generateInvoiceSpecification(value: boolean) {
        this.set('generateInvoiceSpecification', value);
    }

    set skipPayPerEmail(value: boolean) {
        this.set('skipPayPerEmail', value);
    }
}
