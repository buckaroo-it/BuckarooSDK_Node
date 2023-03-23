import { IConfig } from '../../Utils/Types';
import PaymentMethod from '../PaymentMethod';
import { IInvoice } from './Models/Invoice';
import { ICreditNote } from './Models/CreditNote';
import { IDebtor } from './Models/Debtor';
import { IPaymentPlan } from './Models/PaymentPlan';
import { ITransaction } from '../../Models/ITransaction';
import { IMultiInfoInvoice } from './Models/multiInfoInvoice';
import { IAddOrUpdateProductLines } from './Models/AddOrUpdateProductLines';
declare class CreditManagement extends PaymentMethod {
    protected _paymentName: string;
    protected _requiredFields: Array<keyof IConfig>;
    protected _serviceVersion: number;
    createInvoice(payload: IInvoice): Promise<any>;
    createCombinedInvoice(payload: IInvoice): this;
    createCreditNote(payload: ICreditNote): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    addOrUpdateDebtor(payload: IDebtor): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    createPaymentPlan(payload: IPaymentPlan): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    terminatePaymentPlan(payload: Required<Pick<IPaymentPlan, 'includedInvoiceKey'>>): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    pauseInvoice(payload: Required<Pick<ITransaction, 'invoice'>>): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    unpauseInvoice(payload: Required<Pick<ITransaction, 'invoice'>>): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    invoiceInfo(payload: IMultiInfoInvoice): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    debtorInfo(payload: Required<Pick<IInvoice, 'debtor'>>): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    addOrUpdateProductLines(payload: IAddOrUpdateProductLines): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    resumeDebtorFile(payload: {
        debtorFileGuid: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
    pauseDebtorFile(payload: {
        debtorFileGuid: string;
    }): Promise<import("../../Models/TransactionResponse").TransactionResponse>;
}
declare const creditManagement: () => CreditManagement;
export default creditManagement;
