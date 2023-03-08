import { IConfig } from '../../Utils/Types'
import PaymentMethod from '../PaymentMethod'
import { IInvoice, invoice } from './Models/Invoice'
import { creditNote, ICreditNote } from './Models/CreditNote'
import { uniqid } from '../../Utils/Functions'
import { debtor, IDebtor } from './Models/Debtor'
import { IPaymentPlan, paymentPlan } from './Models/PaymentPlan'
import { ITransaction } from '../../Models/ITransaction'
import {IMultiInfoInvoice, multiInfoInvoice} from './Models/multiInfoInvoice'
import { ServiceParameterList} from "../../Utils/ServiceParameter";
import {AddOrUpdateProductLines, IAddOrUpdateProductLines} from "./Models/AddOrUpdateProductLines";

class CreditManagement extends PaymentMethod {
    protected _paymentName = 'CreditManagement3'
    protected requiredFields: Array<keyof IConfig> = ['currency']

    protected _serviceVersion = 1

    createInvoice(payload: IInvoice): Promise<any> {
        this.action = 'CreateInvoice'
        this.services = invoice
        payload.invoice = payload.invoice || uniqid()
        this.setRequest(payload)

        return this.dataRequest()
    }
    createCombinedInvoice(payload: IInvoice) {
        this.action = 'CreateCombinedInvoice'
        this.services = invoice
        payload.invoice = payload.invoice || uniqid()
        this.setServiceList(this.services(payload))

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

        this.services = multiInfoInvoice

        this.setRequest(payload)

        return this.dataRequest()
    }
    debtorInfo(payload: Required<Pick<IInvoice, 'debtor'>>) {
        this.action = 'DebtorInfo'

        this.services = (data:typeof payload) => {
            let serviceData = new ServiceParameterList(data)
            serviceData.setGroupTypes({
                debtor:'Debtor'
            })
            return serviceData
        }

        this.setRequest(payload)

        return this.dataRequest()
    }

    addOrUpdateProductLines(payload:IAddOrUpdateProductLines) {
        this.action = 'AddOrUpdateProductLines'

        this.services = AddOrUpdateProductLines

        this.setRequest(payload)

        return this.dataRequest()
    }

    resumeDebtorFile(payload:{ debtorFileGuid:string }) {
        this.action = 'ResumeDebtorFile'

        this.setServiceList(this.services(payload))

        return this.dataRequest()
    }

    pauseDebtorFile(payload:{ debtorFileGuid:string }) {
        this.action = 'PauseDebtorFile'

        this.setServiceList(this.services(payload))

        return this.dataRequest()
    }
    // public combine(method:Combinable){
    //     if (method.isPayable()){
    //         method.
    //     }
    // }
}
let _creditManagement:CreditManagement
const creditManagement = () => {
    if (!_creditManagement)
        _creditManagement = new CreditManagement()
    return _creditManagement
}
export default creditManagement
