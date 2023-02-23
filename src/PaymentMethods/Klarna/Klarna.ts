import {PayablePaymentMethod} from "../PayablePaymentMethod";
import Pay, {IPay} from "./Models/Pay";
class Klarna extends PayablePaymentMethod {
    protected _paymentName = 'klarna'

    async pay(payload:IPay):Promise<any>{
        this.action = 'Pay'
        return super.pay(payload,new Pay(payload))
    }
    refund(payload){
        this.action = 'Refund'
        return super.pay(payload,{})

    }
    payInInstallments(payload){
        this.action = 'PayInInstallments'
        return super.pay(payload,{})

    }
}

export { Klarna }
