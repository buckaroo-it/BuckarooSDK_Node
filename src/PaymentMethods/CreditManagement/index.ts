import { PaymentMethod } from '../../Services';
import { IInvoice, Invoice } from './Models/Invoice';
import { CreditNote, ICreditNote } from './Models/CreditNote';
import { Debtor, IDebtor } from './Models/Debtor';
import { IPaymentPlan, PaymentPlan } from './Models/PaymentPlan';
import { IMultiInfoInvoice, MultiInfoInvoice } from './Models/multiInfoInvoice';
import { AddOrUpdateProductLines, IAddOrUpdateProductLines } from './Models/AddOrUpdateProductLines';
import { IRequest, ServiceParameter } from '../../Models';
import { DebtorInfo, IDebtorInfo } from './Models/DebtorInfo';
import { ServiceCode } from '../../Utils';

export default class CreditManagement extends PaymentMethod {
    protected _serviceVersion = 1;
    protected _requiredFields = ['currency'];

    public defaultServiceCode(): ServiceCode {
        return 'CreditManagement3';
    }

    createInvoice(payload: IInvoice) {
        this.setServiceList('CreateInvoice', new Invoice(payload));
        return this.dataRequest(payload);
    }

    createCombinedInvoice(payload: IInvoice) {
        this.setServiceList('CreateCombinedInvoice', new Invoice(payload));
        return this.transactionRequest(payload);
    }

    createCreditNote(payload: ICreditNote) {
        this.setServiceList('CreateCreditNote', new CreditNote(payload));
        return this.dataRequest(payload);
    }

    addOrUpdateDebtor(payload: IDebtor) {
        this.setServiceList('AddOrUpdateDebtor', new Debtor(payload));
        return this.dataRequest(payload);
    }

    createPaymentPlan(payload: IPaymentPlan) {
        this.setServiceList('CreatePaymentPlan', new PaymentPlan(payload));
        return this.dataRequest(payload);
    }

    terminatePaymentPlan(payload: Required<Pick<IPaymentPlan, 'includedInvoiceKey'>>) {
        this.setServiceList('TerminatePaymentPlan', new PaymentPlan(payload));
        return this.dataRequest(payload);
    }

    pauseInvoice(payload: Required<Pick<IRequest, 'invoice'>>) {
        this.setServiceList('PauseInvoice');
        return this.dataRequest(payload);
    }

    unpauseInvoice(payload: Required<Pick<IRequest, 'invoice'>>) {
        this.setServiceList('UnpauseInvoice');
        return this.dataRequest(payload);
    }

    invoiceInfo(payload: IMultiInfoInvoice) {
        this.setServiceList('InvoiceInfo', new MultiInfoInvoice(payload));
        return this.dataRequest(payload);
    }

    debtorInfo(payload: IDebtorInfo) {
        this.setServiceList('DebtorInfo', new DebtorInfo(payload));
        return this.dataRequest(payload);
    }

    addOrUpdateProductLines(payload: IAddOrUpdateProductLines) {
        this.setServiceList('AddOrUpdateProductLines', new AddOrUpdateProductLines(payload));
        return this.dataRequest(payload);
    }

    resumeDebtorFile(payload: { debtorFileGuid: string }) {
        let debtorFile = new ServiceParameter().set('debtorFileGuid', payload.debtorFileGuid);
        this.setServiceList('ResumeDebtorFile', debtorFile);
        return this.dataRequest(payload);
    }

    pauseDebtorFile(payload: { debtorFileGuid: string }) {
        let debtorFile = new ServiceParameter().set('debtorFileGuid', payload.debtorFileGuid);
        this.setServiceList('PauseDebtorFile', debtorFile);
        return this.dataRequest(payload);
    }
}
