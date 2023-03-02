import {IConfig} from "../../Utils/Types";
import PaymentMethod from "../PaymentMethod";
import {IInvoice,invoice} from "./Models/Invoice";

class CreditManagement extends PaymentMethod {
    protected _paymentName = 'CreditManagement3'
    protected requiredFields: Array<keyof IConfig> = ['currency']


    createInvoice(payload:IInvoice):Promise<any>{
        this.action = 'CreateInvoice'

        this.services = invoice

        this.setRequest(payload)

        return this.dataRequest()
    }
    createCombinedInvoice(payload:IInvoice){
        this.action = 'CreateCombinedInvoice'

        this.services = invoice

        this.setRequest(payload)

        return this.dataRequest()
    }
    createCreditNote(payload:IInvoice){
        this.action = 'CreateCreditNote'

        this.services = invoice

        this.setRequest(payload)

        return this.dataRequest()
    }
    addOrUpdateDebtor(payload:IInvoice){
        this.action = 'AddOrUpdateDebtor'

        this.services = invoice

        this.setRequest(payload)

        return this.dataRequest()
    }
    createPaymentPlan(payload:IInvoice){
        this.action = 'CreatePaymentPlan'

        this.services = invoice

        this.setRequest(payload)

        return this.dataRequest()
    }
    terminatePaymentPlan(payload:IInvoice){
        this.action = 'TerminatePaymentPlan'

        this.services = invoice

        this.setRequest(payload)

        return this.dataRequest()
    }
    pauseInvoice(payload:IInvoice){
        this.action = 'PauseInvoice'

        this.services = invoice

        this.setRequest(payload)

        return this.dataRequest()
    }
    unpauseInvoice(payload:IInvoice){
        this.action = 'UnpauseInvoice'

        this.services = invoice

        this.setRequest(payload)

        return this.dataRequest()
    }

    invoiceInfo(payload){
        this.action = 'InvoiceInfo'

        this.action = 'UnpauseInvoice'

        this.services = invoice

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
export {
    creditManagement
}