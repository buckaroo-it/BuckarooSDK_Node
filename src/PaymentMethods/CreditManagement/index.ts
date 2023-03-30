import { IConfig } from '../../Utils/Types'
import PaymentMethod from '../PaymentMethod'
import { IInvoice, CreditManagementModelStrategy } from './Models/Invoice'
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
    modelStrategy = new CreditManagementModelStrategy({})
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

        return this.dataRequest(debtor(payload))
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

        return this.dataRequest(multiInfoInvoice(payload))
    }
    debtorInfo(payload: Required<Pick<IInvoice, 'debtor'>>) {
        this.action = 'DebtorInfo'

        return this.dataRequest(debtorInfo(payload))
    }

    addOrUpdateProductLines(payload: IAddOrUpdateProductLines) {
        this.action = 'AddOrUpdateProductLines'
        return this.dataRequest(AddOrUpdateProductLines(payload))
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
let _creditManagement: CreditManagement
const creditManagement = () => {
    if (!_creditManagement) _creditManagement = new CreditManagement()
    return _creditManagement
}
export default creditManagement
export { CreditManagement as CreditManagementClass }
