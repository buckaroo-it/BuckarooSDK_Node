import PaymentMethod from "./PaymentMethod";
import {uniqid} from "../Utils/Functions";
import {Payload} from "../Models/Payload";


export abstract class PayablePaymentMethod extends PaymentMethod {
    protected pay(payload = this.request.getPayload()){

        //SetPayPayLoad
        this.setPayPayload(payload)

        //Call Transaction
        return this.transactionRequest()
    }
    setPayPayload(payload:Payload){
        const services = this.services(payload)
        //Set the Payload
        this.setPayload(PaymentMethod.filterServices(payload,services))

        //Set required Fields
        this.setRequiredFields()

        //Set Services
        this.setServiceList(services)

        //Set setAdditionalParameters
        this.setAdditionalParameters(payload.additionalParameters)
    }

    setPayload(payload: Payload){
        payload['order'] = payload['order'] || uniqid()
        this.request.setPayload(payload)
    }
}
