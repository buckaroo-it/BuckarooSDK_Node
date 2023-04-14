import { IConfig } from '../../Utils/Types'
import PaymentMethod from '../PaymentMethod'
import { IInvoice } from './Models/Invoice'
import { ICreditNote } from './Models/CreditNote'
import { uniqid } from '../../Utils/Functions'
import { IDebtor } from './Models/Debtor'
import { IPaymentPlan } from './Models/PaymentPlan'
import { ITransaction } from '../../Models/ITransaction'
import { IMultiInfoInvoice } from './Models/multiInfoInvoice'
import { AddOrUpdateProductLines, IAddOrUpdateProductLines } from './Models/AddOrUpdateProductLines'

export default class CreditManagement extends PaymentMethod {
    protected _paymentName = 'CreditManagement3'
    protected _requiredFields: Array<keyof IConfig> = ['currency']

    protected _serviceVersion = 1
    createInvoice(payload: IInvoice): Promise<any> {
        this.action = 'CreateInvoice'
        payload.invoice = payload.invoice || uniqid()
        return this.dataRequest(payload)
    }
    createCombinedInvoice(payload: IInvoice) {
        this.action = 'CreateCombinedInvoice'
        payload.invoice = payload.invoice || uniqid()
        this.setRequest(payload)
        return this
    }
    createCreditNote(payload: ICreditNote) {
        this.action = 'CreateCreditNote'

        return this.dataRequest(payload)
    }
    addOrUpdateDebtor(payload: IDebtor) {
        this.action = 'AddOrUpdateDebtor'

        return this.dataRequest(payload)
    }
    createPaymentPlan(payload: IPaymentPlan) {
        this.action = 'CreatePaymentPlan'

        return this.dataRequest(payload)
    }
    terminatePaymentPlan(payload: Required<Pick<IPaymentPlan, 'includedInvoiceKey'>>) {
        this.action = 'TerminatePaymentPlan'

        return this.dataRequest(payload)
    }
    pauseInvoice(payload: Required<Pick<ITransaction, 'invoice'>>) {
        this.action = 'PauseInvoice'

        return this.dataRequest(payload)
    }
    unpauseInvoice(payload: Required<Pick<ITransaction, 'invoice'>>) {
        this.action = 'UnpauseInvoice'

        return this.dataRequest(payload)
    }

    invoiceInfo(payload: IMultiInfoInvoice) {
        this.action = 'InvoiceInfo'

        return this.dataRequest(payload)
    }
    debtorInfo(payload: Required<Pick<IInvoice, 'debtor'>>) {
        this.action = 'DebtorInfo'

        return this.dataRequest(payload)
    }

    addOrUpdateProductLines(payload: IAddOrUpdateProductLines) {
        this.action = 'AddOrUpdateProductLines'
        return this.dataRequest(payload)
    }

    resumeDebtorFile(payload: { debtorFileGuid: string }) {
        this.action = 'ResumeDebtorFile'

        return this.dataRequest(payload)
    }

    pauseDebtorFile(payload: { debtorFileGuid: string }) {
        this.action = 'PauseDebtorFile'

        return this.dataRequest(payload)
    }
}
