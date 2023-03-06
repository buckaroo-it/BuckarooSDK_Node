import { TransactionRequest } from '../Models/Request'
import { IConfig } from '../Utils/Types'
import { ServiceList } from '../Models/ServiceList'
import { buckarooClient } from '../BuckarooClient'
import client from '../Request/Client'
import {ServiceParameterList} from "../Utils/ServiceParameter";

export default abstract class PaymentMethod {
    // protected serviceParameters: Array<string> = []
    protected readonly requiredFields: Array<keyof IConfig> = ['currency', 'pushURL']
    protected _paymentName = ''
    protected _serviceVersion = 0
    protected request: TransactionRequest = new TransactionRequest()
    private _action = ''
    protected services: (data) => ServiceParameterList = (data) => {
        return new ServiceParameterList(data)
    }
    get paymentName(): string {
        return this._paymentName
    }

    get serviceVersion(): number {
        return this._serviceVersion
    }
    get action(): string {
        return this._action
    }
    set action(value: string) {
        this._action = value
    }

    protected setServiceList(serviceList: ServiceParameterList) {
        let services = new ServiceList({
            name: this.paymentName,
            action: this.action,
            version: this.serviceVersion,
            parameters: serviceList.formatServiceParameters()
        })
        this.request.setData('Services', {
            ServiceList: [...this.request.getServiceList(), services]
        })
    }
    protected setAdditionalParameters(additionalParameters?: AdditionalParameters) {
        if (additionalParameters) {
            this.request.setData('additionalParameters', {
                additionalParameter: Object.keys(additionalParameters).map((key) => {
                    return {
                        name: key,
                        value: additionalParameters[key] ?? ''
                    }
                })
            })
        }
    }

    protected setRequiredFields() {
        for (const requiredField of this.requiredFields) {
            if (!this.request.getData()[requiredField])
                this.request.setData(requiredField, buckarooClient().getConfig()[requiredField])
        }
    }
    combine(method) {
        const combineServices = method.request.getData()

        if (typeof combineServices !== 'undefined') {
            this.request.setRequest({ ...combineServices, ...this.request.getData() })
        }
        return this
    }
    protected transactionRequest() {
        return client.post(this.request.getData(), client.getTransactionUrl())
    }

    protected dataRequest() {
        return client.dataRequest(this.request.getData())
    }
    protected setRequest(data) {

        //Get Services
        const services = this.services(data)

        //Set the Payload
        this.request.setRequest(this.request.filterServices(data, services))

        //Set required Fields
        this.setRequiredFields()

        //Set Services
        this.setServiceList(services)

        //Set setAdditionalParameters
        this.setAdditionalParameters(data.additionalParameters)
    }
    public specifications() {
        return client.specification(this.paymentName, this.serviceVersion)
    }
}

export declare interface AdditionalParameters {
    additionalParameters?: Array<any>
}
