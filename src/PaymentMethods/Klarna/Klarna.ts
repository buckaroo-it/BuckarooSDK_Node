import {PayablePaymentMethod} from "../PayablePaymentMethod";
import {Services , IPay} from "./Models/Pay";
import {IConfig} from "../../Utils/Types";
import {RefundPayload} from "../../Models/Payload";
import {TransactionResponse} from "../../Models/TransactionResponse";

export class Klarna extends PayablePaymentMethod {
    protected _paymentName = 'klarna'
    protected _serviceVersion = 1
    protected requiredFields: Array<keyof IConfig> = ['currency', 'pushURL']
    async pay(payload:IPay):Promise<TransactionResponse>{
        this.action = 'Pay'

        const services = Services(payload || this.request.getData())
        return super.pay(services,payload)
    }
    refund(payload:RefundPayload){
        this.action = 'Refund'
        return super.pay({},payload)

    }
    payInInstallments(payload){
        this.action = 'PayInInstallments'
        return super.pay({},payload)
    }
}
const klarna =  new Klarna()
export { klarna }