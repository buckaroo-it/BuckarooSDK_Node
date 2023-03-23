import { IConfig } from '../../Utils/Types'
import PaymentMethod from '../PaymentMethod'
import { IInvoice, invoice } from './Models/Invoice'
import { ICreditNote } from './Models/CreditNote'
import { uniqid } from '../../Utils/Functions'
import { debtor, debtorInfo, IDebtor } from './Models/Debtor'
import { IPaymentPlan } from './Models/PaymentPlan'
import { ITransaction } from '../../Models/ITransaction'
import { IMultiInfoInvoice, multiInfoInvoice } from './Models/multiInfoInvoice'
import { AddOrUpdateProductLines, IAddOrUpdateProductLines } from './Models/AddOrUpdateProductLines'

class CreditManagement extends PaymentMethod {
    protected _paymentName = 'CreditManagement3'
    protected _requiredFields: Array<keyof IConfig> = ['currency']

    protected _serviceVersion = 1

    createInvoice(payload: IInvoice): Promise<any> {
        this.action = 'CreateInvoice'
        payload.invoice = payload.invoice || uniqid()
        this.servicesStrategy = invoice
        this.setRequest(payload)

        return this.dataRequest()
    }
    createCombinedInvoice(payload: IInvoice) {
        this.action = 'CreateCombinedInvoice'

        payload.invoice = payload.invoice || uniqid()
        this.servicesStrategy = invoice

        this.setServiceList(payload)

        return this
    }
    createCreditNote(payload: ICreditNote) {
        this.action = 'CreateCreditNote'

        this.setRequest(payload)

        return this.dataRequest()
    }
    addOrUpdateDebtor(payload: IDebtor) {
        this.action = 'AddOrUpdateDebtor'

        this.servicesStrategy = debtor
        this.setRequest(payload)

        return this.dataRequest()
    }
    createPaymentPlan(payload: IPaymentPlan) {
        this.action = 'CreatePaymentPlan'

        this.setRequest(payload)

        return this.dataRequest()
    }
    terminatePaymentPlan(payload: Required<Pick<IPaymentPlan, 'includedInvoiceKey'>>) {
        this.action = 'TerminatePaymentPlan'

        this.setRequest(<IPaymentPlan>payload)

        return this.dataRequest()
    }
    pauseInvoice(payload: Required<Pick<ITransaction, 'invoice'>>) {
        this.action = 'PauseInvoice'

        this.setRequest(payload)

        return this.dataRequest()
    }
    unpauseInvoice(payload: Required<Pick<ITransaction, 'invoice'>>) {
        this.action = 'UnpauseInvoice'

        this.setRequest(payload)

        return this.dataRequest()
    }

    invoiceInfo(payload: IMultiInfoInvoice) {
        this.action = 'InvoiceInfo'
        this.servicesStrategy = multiInfoInvoice
        this.setRequest(payload)

        return this.dataRequest()
    }
    debtorInfo(payload: Required<Pick<IInvoice, 'debtor'>>) {
        this.action = 'DebtorInfo'
        this.servicesStrategy = debtorInfo
        this.setRequest(<ITransaction>payload)

        return this.dataRequest()
    }

    addOrUpdateProductLines(payload: IAddOrUpdateProductLines) {
        this.action = 'AddOrUpdateProductLines'
        this.servicesStrategy = AddOrUpdateProductLines
        this.setRequest(payload)
        return this.dataRequest()
    }

    resumeDebtorFile(payload: { debtorFileGuid: string }) {
        this.action = 'ResumeDebtorFile'

        this.setServiceList(payload)

        return this.dataRequest()
    }

    pauseDebtorFile(payload: { debtorFileGuid: string }) {
        this.action = 'PauseDebtorFile'

        this.setServiceList(payload)

        return this.dataRequest()
    }
}
let _creditManagement: CreditManagement
const creditManagement = () => {
    if (!_creditManagement) _creditManagement = new CreditManagement()
    return _creditManagement
}
export default creditManagement
