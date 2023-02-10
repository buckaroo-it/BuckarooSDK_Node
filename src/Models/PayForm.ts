import { uniqid } from "../Functions/Functions";
import Services from "./Services";
import Model from "./Model";

export default class PayForm {
    order?;
    amountDebit: number|string;
    invoice:string;
    currency?: string
    amountCredit?: number
    description?: string
    clientIP?: 'IPAddress'
    returnURL?: string
    returnURLCancel?: string
    returnURLError?: string
    returnURLReject?: string
    originalTransactionKey?: string
    startRecurrent?: boolean
    continueOnIncomplete?: 1|0
    servicesSelectableByClient?: string
    servicesExcludedForClient?: string
    pushURL?: string
    pushURLFailure?: string
    clientUserAgent?: string
    originalTransactionReference?: 'TransactionReference'
    services?: Services
    customParameters?: 'CustomParameters'
    additionalParameters?: 'TransactionRequestAdditionalParameters'

    constructor(data) {
        this.order = uniqid("ORDER_NO_");
        this.amountDebit =  data['amountDebit'] || '';
        this.invoice = data['invoice'] || '';
        Model.setParameters(this,data)
    }

    setServices?(payModel,paymentName,serviceVersion,action){
        this.services = new Services(
            paymentName,
            serviceVersion,
            action,
            payModel
        );
        return this;
    }
}