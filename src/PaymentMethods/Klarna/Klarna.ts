import {PayablePaymentMethod} from "../PayablePaymentMethod";
import Pay, {IPay} from "./Models/Pay";
import {IConfig} from "../../Utils/Types";
import {RefundPayload} from "../../Models/Payload";
class Klarna extends PayablePaymentMethod {
    protected _paymentName = 'klarna'
    protected requiredFields: Array<keyof IConfig> = ['currency']
    async pay(payload:IPay):Promise<any>{
        this.action = 'Pay'

        const services = new Pay(payload || this.request.getData())

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

export { Klarna }
