import PaymentMethod from "./PaymentMethod";
import {uniqid} from "../Utils/Functions";
import {Payload} from "../Models/Payload";


export abstract class PayablePaymentMethod extends PaymentMethod {
    protected pay(payload = this.request.getPayload()){

        //SetPayPayLoad
        this.setPayload(payload)

        //Call Transaction
        return this.transactionRequest()
    }

    setPayload(payload: Payload){
        payload['order'] = payload['order'] || uniqid()

        this.setRequest(payload)
    }
}
