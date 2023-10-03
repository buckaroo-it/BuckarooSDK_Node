import { RequestTypes } from '../Constants/Endpoints'
import IRequest from '../Models/IRequest'
import Buckaroo from '../index'
import Request from '../Request/Request'
import { ServiceList } from '../Models/IServiceList'
import { ServiceParameter } from '../Models/ServiceParameters'
import { IParameter } from '../Models/IParameters'
import { DataRequestData, TransactionData } from '../Request/DataModels'

export default abstract class PaymentMethod {
    protected _paymentName: string = ''
    protected _serviceCode?: string
    protected _serviceVersion: number = 0
    protected _payload: IRequest = {}
    protected _serviceList: ServiceList = new ServiceList()
    constructor(serviceCode?: string) {
        this._serviceCode = serviceCode
    }
    get serviceVersion() {
        return this._serviceVersion
    }
    set serviceVersion(value: number) {
        this._serviceVersion = value
    }
    get serviceCode() {
        return this._serviceCode || ''
    }
    get paymentName() {
        return this._paymentName
    }
    protected _requiredFields: Array<keyof IRequest> = []
    protected setRequiredFields(requiredFields: Array<keyof IRequest> = this._requiredFields) {
        for (const fieldKey of requiredFields) {
            let field = this._payload[fieldKey] ?? Buckaroo.Client.config[fieldKey]
            if (field === undefined) {
                throw new Error(`Missing required config parameter ${String(fieldKey)}`)
            }
            this._payload[fieldKey] = field
        }
        return this
    }
    protected setPayload(payload: IRequest) {
        this.setRequiredFields()
        this._payload = { ...this._payload, ...payload }
    }
    getPayload() {
        return this._payload
    }
    protected setServiceList(
        action: string,
        serviceParameters?: IParameter[] | ServiceParameter,
        serviceCode = this.serviceCode,
        serviceVersion = this.serviceVersion
    ) {
        this._serviceList.addService({
            name: serviceCode,
            action: action,
            version: serviceVersion,
            parameters:
                serviceParameters instanceof ServiceParameter
                    ? serviceParameters.toParameterList()
                    : serviceParameters
        })
    }
    getServices() {
        return this._serviceList.list
    }
    protected transactionRequest(payload?: IRequest) {
        let data = new TransactionData({ ...(payload ?? this._payload) })
        if (this._serviceList.list.length > 0) {
            data.setServiceList(this._serviceList)
        }
        return Request.Transaction(data)
    }
    protected dataRequest(payload?: IRequest) {
        let data = new DataRequestData({ ...(payload ?? this._payload) })
        if (this._serviceList.list.length > 0) {
            data.setServiceList(this._serviceList)
        }
        return Request.DataRequest(data)
    }
    public specification(type: RequestTypes.Transaction | RequestTypes.Data = RequestTypes.Data) {
        return Request.Specification(type, { name: this.serviceCode, version: this.serviceVersion })
    }
    combine<Payload extends TransactionData>(data: Payload): this
    combine<Method extends PaymentMethod>(method: Method): this
    combine(data): this {
        if (data instanceof PaymentMethod) {
            data = data.getPayload()
        }
        let { services, Services, ...payload } = data
        for (const key in payload) {
            if (payload.hasOwnProperty(key)) {
                this._payload[key] = payload[key]
            }
        }
        for (const service of services?.serviceList) {
            this.setServiceList(service.action, service.parameters, service.name, service.version)
        }
        return this
    }
}
