import { IConfig } from '../../Utils/Types'
import PaymentMethod from '../PaymentMethod'
import { IInvoice, invoice } from './Models/Invoice'
import { creditNote, ICreditNote } from './Models/CreditNote'
import { uniqid } from '../../Utils/Functions'
import { debtor, IDebtor } from './Models/Debtor'
import { IPaymentPlan, paymentPlan } from './Models/PaymentPlan'
import { Payload } from '../../Models/Payload'
import { multiInfoInvoice } from './Models/multiInfoInvoice'

class CreditManagement extends PaymentMethod {
    protected _paymentName = 'CreditManagement3'
    protected requiredFields: Array<keyof IConfig> = ['currency']

    _serviceVersion = 1
    createInvoice(payload: IInvoice): Promise<any> {
        this.action = 'CreateInvoice'
        this.services = invoice
        this.request.setData('invoice', uniqid())
        this.setRequest(payload)
        return this.dataRequest()
    }
    createCombinedInvoice(payload: IInvoice) {
        this.action = 'CreateCombinedInvoice'

        this.services = invoice
        this.request.setData('invoice', uniqid())

        this.setRequest(payload)

        return this
    }
    createCreditNote(payload: ICreditNote) {
        this.action = 'CreateCreditNote'

        this.services = creditNote

        this.setRequest(payload)

        return this.dataRequest()
    }
    addOrUpdateDebtor(payload: IDebtor) {
        this.action = 'AddOrUpdateDebtor'

        this.services = debtor

        this.setRequest(payload)

        return this.dataRequest()
    }
    createPaymentPlan(payload: IPaymentPlan) {
        this.action = 'CreatePaymentPlan'

        this.services = paymentPlan

        this.setRequest(payload)

        return this.dataRequest()
    }
    terminatePaymentPlan(payload: Required<Pick<IPaymentPlan, 'includedInvoiceKey'>>) {
        this.action = 'TerminatePaymentPlan'

        this.services = paymentPlan

        this.setRequest(payload)

        return this.dataRequest()
    }
    pauseInvoice(payload: Required<Pick<Payload, 'invoice'>>) {
        this.action = 'PauseInvoice'

        this.setRequest(payload)

        return this.dataRequest()
    }
    unpauseInvoice(payload: Required<Pick<Payload, 'invoice'>>) {
        this.action = 'UnpauseInvoice'

        this.setRequest(payload)

        return this.dataRequest()
    }

    invoiceInfo(payload: { invoice: string | string[] }) {
        this.action = 'InvoiceInfo'
        if (Array.isArray(payload.invoice)) {
            this.services = multiInfoInvoice
        }
        this.setRequest(payload)

        return this.dataRequest()
    }
    debtorInfo(payload) {
        this.action = 'DebtorInfo'

        this.services = invoice

        this.setRequest(payload)

        return this.dataRequest()
    }

    addOrUpdateProductLines(payload) {
        this.action = 'AddOrUpdateProductLines'

        this.services = invoice

        this.setRequest(payload)

        return this.dataRequest()
    }

    resumeDebtorFile(payload) {
        this.action = 'ResumeDebtorFile'

        this.services = invoice

        this.setRequest(payload)

        return this.dataRequest()
    }

    pauseDebtorFile(payload) {
        this.action = 'PauseDebtorFile'

        this.services = invoice

        this.setRequest(payload)

        return this.dataRequest()
    }
}
const creditManagement = () => new CreditManagement()
export { creditManagement }
