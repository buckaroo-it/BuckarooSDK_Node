import { IConfig } from '../../Utils/Types';
import PaymentMethod from '../PaymentMethod';
import { IInvoice } from './Models/Invoice';
import { ICreditNote } from './Models/CreditNote';
import { IDebtor } from './Models/Debtor';
import { IPaymentPlan } from './Models/PaymentPlan';
import { ITransaction } from '../../Models/ITransaction';
import { IMultiInfoInvoice } from './Models/multiInfoInvoice';
import { IAddOrUpdateProductLines } from "./Models/AddOrUpdateProductLines";
declare class CreditManagement extends PaymentMethod {
    protected _paymentName: string;
    protected requiredFields: Array<keyof IConfig>;
    protected _serviceVersion: number;
    createInvoice(payload: IInvoice): Promise<any>;
    createCombinedInvoice(payload: IInvoice): this;
    createCreditNote(payload: ICreditNote): Promise<any>;
    addOrUpdateDebtor(payload: IDebtor): Promise<any>;
    createPaymentPlan(payload: IPaymentPlan): Promise<any>;
    terminatePaymentPlan(payload: Required<Pick<IPaymentPlan, 'includedInvoiceKey'>>): Promise<any>;
    pauseInvoice(payload: Required<Pick<ITransaction, 'invoice'>>): Promise<any>;
    unpauseInvoice(payload: Required<Pick<ITransaction, 'invoice'>>): Promise<any>;
    invoiceInfo(payload: IMultiInfoInvoice): Promise<any>;
    debtorInfo(payload: Required<Pick<IInvoice, 'debtor'>>): Promise<any>;
    addOrUpdateProductLines(payload: IAddOrUpdateProductLines): Promise<any>;
    resumeDebtorFile(payload: {
        debtorFileGuid: string;
    }): Promise<any>;
    pauseDebtorFile(payload: {
        debtorFileGuid: string;
    }): Promise<any>;
}
declare const creditManagement: () => CreditManagement;
export default creditManagement;
