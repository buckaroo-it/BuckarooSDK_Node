import { TransactionRequest } from '../Models/Request'
import {IConfig, ServiceParameters} from '../Utils/Types'
import { RequestType } from '../Constants/Endpoints'
import { ITransaction } from '../Models/ITransaction'
import buckarooClient from '../BuckarooClient'
import {IServiceList} from "../Models/ServiceList";

export default abstract class PaymentMethod {
    protected readonly _requiredFields: Array<keyof IConfig> = ['currency', 'pushURL']
    protected _paymentName = ''
    protected _serviceVersion = 0
    protected request: TransactionRequest = new TransactionRequest()
    private _action = ''
    public combinable: boolean = false
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
    }

    public setRequest(data: {[key:string]:any}) {
        this.request.setBasicParameters(data)

        this.setRequiredFields()

        this.setServiceParameters(this.request.filter(data))
    }

    protected setServiceParameters(serviceParameters:ServiceParameters) {
        let serviceList:IServiceList = {
            Action: this.action,
            Name: this.paymentName,
            Version: this.serviceVersion
        }
        if (Object.keys(serviceParameters).length > 0) {
            serviceList.Parameters =
            this.request.formatServiceParameters(serviceParameters)
        }
        this.request.addServices(serviceList)
    }

    protected setRequiredFields() {
        for (const requiredField of this._requiredFields) {
            if (!this.request.data[requiredField])
                this.request.data[requiredField] = buckarooClient().getConfig()[requiredField]
        }
    }
    protected transactionRequest(requestData: object) {
        this.setRequest(requestData)

        return buckarooClient().transactionRequest(this.request.data)
    }
    protected dataRequest(requestData:ITransaction = {}) {
        this.setRequest(requestData)

        return buckarooClient().dataRequest(this.request.data)
    }
    public combine(method: PaymentMethod) {
        if (method.combinable && this.combinable) {
            if (Object.keys(method.request.data).length > 0) {
                let services = this.request.services
                if (services && method.request.services) {
                    method.request.services.ServiceList =
                        services.ServiceList.concat(method.request.services.ServiceList)
                }
                Object.assign(this.request.data, method.request.data)
            }
        }
        return this
    }
    public specification(type?: RequestType) {
        return buckarooClient().specification(this.paymentName, this.serviceVersion, type)
    }
}
