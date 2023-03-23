import { TransactionRequest } from '../Models/Request'
import { IConfig } from '../Utils/Types'
import { buckarooClient } from '../BuckarooClient'
import { ServiceParameters } from '../Utils/ServiceParameter'
import { Combinable } from '../Utils/Combinable'
import { ITransaction } from '../Models/ITransaction'
import { RequestType } from '../Constants/Endpoints'
import { TransactionResponse } from '../Models/TransactionResponse'

export default abstract class PaymentMethod {
    protected readonly _requiredFields: Array<keyof IConfig> = ['currency', 'pushURL']
    get requiredFields(): Array<keyof IConfig> {
        return this._requiredFields
    }
    protected _paymentName = ''
    protected _serviceVersion = 0
    protected request: TransactionRequest = new TransactionRequest()
    private _action = ''
    protected serviceParameters: { action?: string; name?: string; version?: number; parameters? } =
        {}

    protected servicesStrategy: (data) => object = (data) => {
        return data
    }

    get paymentName(): string {
        return this._paymentName
    }
    protected set paymentName(value: string) {
        this._paymentName = value
    }
    get serviceVersion(): number {
        return this._serviceVersion
    }
    protected get action(): string {
        return this._action
    }
    protected set action(value: string) {
        this._action = value
        this.serviceParameters.action = value
    }
    protected setServiceList(serviceList: object) {
        //Handle service list Parameters
        if (Object.keys(serviceList).length > 0) {
            this.serviceParameters.parameters = ServiceParameters.toServiceParameterList(
                this.servicesStrategy(serviceList)
            )
        }

        this.serviceParameters.action = this.action
        this.serviceParameters.name = this.paymentName
        this.serviceParameters.version = this.serviceVersion

        this.request.addServices(this.serviceParameters)

        //Reset service Strategy
        this.servicesStrategy = (data) => data
    }
    protected setAdditionalParameters(additionalParameters?: AdditionalParameters) {
        if (additionalParameters) {
            this.request.setDataKey('additionalParameters', {
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
        for (const requiredField of this._requiredFields) {
            if (!this.request.getData()[requiredField])
                this.request.setDataKey(requiredField, buckarooClient().getConfig()[requiredField])
        }
    }
    protected transactionRequest() {
        return buckarooClient().transactionRequest(this.request.getData())
    }
    protected dataRequest() {
        return buckarooClient()
            .dataRequest(this.request.getData())
            .then((response) => {
                return new TransactionResponse(response)
            })
    }
    public combine(method: Combinable) {
        const data = method['request'].getData().services
        if (data?.ServiceList) {
            for (const serviceList of data.ServiceList) {
                if (!this.request.getData().services?.ServiceList.includes(serviceList)) {
                    this.request.addServices(serviceList)
                }
            }
        }
        return this
    }
    public setRequest(data: ITransaction) {
        //Set the Payload
        this.request.setData(this.takeBasicParameters(data))

        //Set required Fields
        this.setRequiredFields()

        //Set Services
        this.setServiceList(data)

        //Set setAdditionalParameters
        this.setAdditionalParameters()
    }

    public specification(type?: RequestType) {
        return buckarooClient().specification(this.paymentName, this.serviceVersion, type)
    }

    private takeBasicParameters(data) {
        let basicParametersData = {}
        for (const basicParameterDataKey in data) {
            if (this.request.basicParameters[basicParameterDataKey]) {
                basicParametersData[basicParameterDataKey] = data[basicParameterDataKey]
                delete data[basicParameterDataKey]
            }
        }
        return basicParametersData
    }
}
export declare interface AdditionalParameters {
    additionalParameters?: Array<any>
}
