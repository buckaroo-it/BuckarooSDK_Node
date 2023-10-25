import IRequest from '../../../Models/IRequest';
import CreditManagementInstallmentInterval from '../../../Constants/CreditManagementInstallmentInterval';
import { ServiceParameter } from '../../../Models/ServiceParameters';

export interface IPaymentPlan extends IRequest {
    includedInvoiceKey?: string;
    dossierNumber?: string;
    installmentCount?: number;
    installmentAmount?: number;
    initialAmount?: number;
    startDate?: string;
    interval?: CreditManagementInstallmentInterval;
    paymentPlanCostAmount?: number;
    paymentPlanCostAmountVat?: number;
    recipientEmail?: string;
}

export class PaymentPlan extends ServiceParameter implements IPaymentPlan {
    set includedInvoiceKey(value: string) {
        this.set('includedInvoiceKey', value);
    }

    set dossierNumber(value: string) {
        this.set('dossierNumber', value);
    }

    set installmentCount(value: number) {
        this.set('installmentCount', value);
    }

    set installmentAmount(value: number) {
        this.set('installmentAmount', value);
    }

    set initialAmount(value: number) {
        this.set('initialAmount', value);
    }

    set startDate(value: string) {
        this.set('startDate', value);
    }

    set interval(value: CreditManagementInstallmentInterval) {
        this.set('interval', value);
    }

    set paymentPlanCostAmount(value: number) {
        this.set('paymentPlanCostAmount', value);
    }

    set paymentPlanCostAmountVat(value: number) {
        this.set('paymentPlanCostAmountVat', value);
    }

    set recipientEmail(value: string) {
        this.set('recipientEmail', value);
    }
}
