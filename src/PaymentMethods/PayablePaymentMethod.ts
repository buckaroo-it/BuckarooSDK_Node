import PaymentMethod from "./PaymentMethod";
import { Payload } from "../Models/Payload";
import Model from "../Models/Model";
import client from "../Request/Client";
import { ParameterList } from "../Models/Parameters";
import {ServiceList} from "../Models/ServiceList";
import {buckarooClient} from "../BuckarooClient";

export abstract class PayablePaymentMethod extends PaymentMethod{
    public pay(payload: Payload,services:{} = {}){
        const payloadModel = new Model(payload)
        //Set the payload
        this.setPayload(payloadModel.filter(Object.keys(services)))

        this.setRequiredFields(payloadModel)
        //Set service parameters
        this.setServiceParameters(services)

        //Set setAdditionalParameters
        this.setAdditionalParameters(payload.additionalParameters)

        return client.post(this.request.getData(), client.getTransactionUrl())

    }

    protected setPayload(payload){
        this.request.setPayload(payload)
    }

    protected setServiceParameters(serviceList: object ){
        let services = new ServiceList({
            name: this.paymentName,
            action: this.action,
            parameters: new ParameterList(serviceList).parameterList
        })
        this.request.setServiceParameters(services)
    }

    protected setAdditionalParameters(additionalParameters: AdditionalParameters) {
        if(additionalParameters) {
            this.request.setData('additionalParameters', {
                additionalParameter: Object.keys(additionalParameters).map((key) => {
                    return {
                        name: key,
                        value: additionalParameters?[key]: ''
                    };
                })
            })
        }
    }

    protected setRequiredFields(payload){
        for (const requiredField of this.requiredFields) {
            this.request.setData(requiredField,
                payload[requiredField] || buckarooClient().getConfig()[requiredField])
        }
    }
}

export declare interface AdditionalParameters{
    additionalParameters?: Array<any>
}