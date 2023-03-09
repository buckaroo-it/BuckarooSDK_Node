import { ServiceParameterList } from "../../../Utils/ServiceParameter";
import { ITransaction } from "../../../Models/ITransaction";
export interface IPaymentPlan extends ITransaction {
    includedInvoiceKey: string;
    dossierNumber: string;
    installmentCount: Number;
    installmentAmount: Number;
    initialAmount?: Number;
    startDate: string;
    interval: string;
    paymentPlanCostAmount: Number;
    paymentPlanCostAmountVat?: Number;
    recipientEmail: string;
}
export declare const paymentPlan: (data: any) => ServiceParameterList;
