import PaymentMethod from "./PaymentMethod";
import Model from "../Models/Model";
import client from "../Request/Client";
import { ParameterList } from "../Models/Parameters";
import { ServiceList } from "../Models/ServiceList";
import { buckarooClient } from "../BuckarooClient";

export abstract class PayablePaymentMethod extends PaymentMethod{
    public pay(services, payload = this.request.getData()){

        const payloadModel = new Model(payload)

        //Set the Payload
        this.setPayload(payloadModel.filter(Object.keys(services ?? {})))

        //Set Services
        this.setServiceList(services)

        //Set required Fields
        this.setRequiredFields()

        //Set setAdditionalParameters
        this.setAdditionalParameters(this.request.getData().additionalParameters)

        return client.post(this.request.getData(), client.getTransactionUrl())
    }

    setPayload(payload){
        this.request.setPayload(payload)
    }

    protected setServiceList(serviceList: object ){
        let services = new ServiceList({
            name: this.paymentName,
            action: this.action,
            version: this.serviceVersion,
            parameters: new ParameterList().addParameterList(serviceList)
        })
        this.request.setServices({
            ServiceList : [services]
        })
    }
    protected setAdditionalParameters(additionalParameters?: AdditionalParameters) {
        if(additionalParameters) {
            this.request.setData('additionalParameters',
                // {
                // additionalParameter:
                    Object.keys(additionalParameters).map((key) => {
                    return {
                        name: key,
                        value: additionalParameters[key] ?? ''
                    };
                })
            // }
            )
        }
    }

    protected setRequiredFields(){
        for (const requiredField of this.requiredFields) {
         if(!this.request.getData()[requiredField])
            this.request.setData(requiredField, buckarooClient().getConfig()[requiredField])
        }
    }
}

export declare interface AdditionalParameters{
    additionalParameters?: Array<any>
}