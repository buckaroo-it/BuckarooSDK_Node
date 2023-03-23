import { ITransaction } from '../../../Models/ITransaction';
import CreditManagementInstallmentInterval from '../../../Constants/CreditManagementInstallmentInterval';
export interface IPaymentPlan extends ITransaction {
    includedInvoiceKey: string;
    dossierNumber: string;
    installmentCount: Number;
    installmentAmount: Number;
    initialAmount?: Number;
    startDate: string;
    interval: CreditManagementInstallmentInterval;
    paymentPlanCostAmount: Number;
    paymentPlanCostAmountVat?: Number;
    recipientEmail: string;
}
