import PaymentMethod from "./PaymentMethod";
import Model from "../Models/Model";
import client from "../Request/Client";


export abstract class PayablePaymentMethod extends PaymentMethod {
    protected pay(services, payload = this.request.getData()){

        const payloadModel = new Model(payload)

        //Set the Payload
        this.setPayload(payloadModel.filter(Object.keys(services ?? {})))

        //Set required Fields
        this.setRequiredFields()

        //Set Services
        this.setServiceList(services)

        //Set setAdditionalParameters
        this.setAdditionalParameters(payload.additionalParameters)

        //Call Transaction
        return this.transactionRequest()
    }

    setPayload(payload){
        this.request.setPayload(payload)
    }
}
