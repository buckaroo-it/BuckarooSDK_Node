import {TransactionRequest} from "../Models/Request";
import {IConfig} from "../Utils/Types";
import {ServiceList} from "../Models/ServiceList";
import {ParameterList} from "../Models/Parameters";
import {buckarooClient} from "../BuckarooClient";
import client from "../Request/Client";

export default abstract class PaymentMethod {
    // protected serviceParameters: Array<string> = []
    protected readonly requiredFields: Array<keyof IConfig> = ['currency', 'pushURL']
    protected _paymentName = ''
    protected _serviceVersion = 0
    protected request: TransactionRequest = new TransactionRequest
    private _action = ''
    protected services: (data) => object = (data) =>  { return {} };
    get paymentName(): string {
        return this._paymentName;
    }

    get serviceVersion(): number {
        return this._serviceVersion;
    }
    get action(): string {
        return this._action;
    }
    set action(value: string) {
        this._action = value;
    }


    protected setServiceList(serviceList: object ){
        let services = new ServiceList({
            name: this.paymentName,
            action: this.action,
            version: this.serviceVersion,
            parameters: new ParameterList().addParameterList(serviceList)
        })
        this.request.addServices([services])
    }
    protected setAdditionalParameters(additionalParameters?: AdditionalParameters) {
        if(additionalParameters) {
            this.request.setData('additionalParameters',
                {
                additionalParameter:
                Object.keys(additionalParameters).map((key) => {
                    return {
                        name: key,
                        value: additionalParameters[key] ?? ''
                    };
                })
                }
            )
        }
    }

    protected setRequiredFields(){
        for (const requiredField of this.requiredFields) {
            if(!this.request.getData()[requiredField])
                this.request.setData(requiredField, buckarooClient().getConfig()[requiredField])
        }
    }
    protected static filterServices(data,services){
        const serviceKeys = Object.keys(services)
        for (const serviceKey of serviceKeys) {
            delete data[serviceKey]
        }
        return data
    }
    combine(method){
        const combineServices = method.request.getData()

        if(typeof combineServices !== 'undefined') {
            this.request.setPayload({...combineServices,...this.request.getData()})

        }
        return this
    }
    protected transactionRequest(){
        return client.post(this.request.getData(), client.getTransactionUrl())
    }

    protected dataRequest(){
        return client.dataRequest(this.request.getData())
    }
    public specifications(){
        return client.specification(this.paymentName,this.serviceVersion)
    }
}



export declare interface AdditionalParameters{
    additionalParameters?: Array<any>
}