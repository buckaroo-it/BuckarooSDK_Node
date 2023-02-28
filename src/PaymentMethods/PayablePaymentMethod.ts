import PaymentMethod from "./PaymentMethod";
import {uniqid} from "../Utils/Functions";
import {PayPayload} from "../Models/Payload";


export abstract class PayablePaymentMethod extends PaymentMethod {
    protected pay(services, payload = this.request.getPayload()){


        //Set the Payload
        this.setPayload(PaymentMethod.filterServices(payload,services))

        //Set required Fields
        this.setRequiredFields()

        //Set Services
        this.setServiceList(services)

        //Set setAdditionalParameters
        this.setAdditionalParameters(payload.additionalParameters)

        //Call Transaction
        return this.transactionRequest()
    }

    setPayload(payload: PayPayload){
        payload.order = payload.order || uniqid()
        this.request.setPayload(payload)
    }
}
