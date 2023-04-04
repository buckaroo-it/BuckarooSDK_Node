import { TransactionRequest } from '../Models/Request'
import { IConfig } from '../Utils/Types'
import { buckarooClient } from '../BuckarooClient'
import { ITransaction } from '../Models/ITransaction'
import { RequestType } from '../Constants/Endpoints'
import { TransactionResponse } from '../Models/TransactionResponse'
import { IServiceList } from '../Models/ServiceList'
import { IPProtocolVersion } from '../Constants/IPProtocolVersion'
import { BuckarooError } from '../Utils/BuckarooError'
import { ModelStrategy } from '../Utils/ModelStrategy'

export default abstract class PaymentMethod {
    protected readonly _requiredFields: Array<keyof IConfig> = ['currency', 'pushURL']
    get requiredFields(): Array<keyof IConfig> {
        return this._requiredFields
    }
    protected _paymentName = ''
    protected _serviceVersion = 0
    protected request: TransactionRequest = new TransactionRequest()
    private _action = ''
    public combinable: boolean = false
    protected serviceParameters: IServiceList = {}
    protected modelStrategy: ModelStrategy<any> = new ModelStrategy({})

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
    getRequestData() {
        return this.request.getData()
    }

    public setRequest(data: ITransaction) {

        this.setBasicParameters(data)

        this.setRequiredFields()

        this.setServiceList(data)
    }

    protected setServiceList(serviceList: object) {
        this.serviceParameters = {
            Action: this.action,
            Name: this.paymentName,
            Version: this.serviceVersion
        }

        if (Object.keys(serviceList).length > 0) {
            this.serviceParameters.Parameters = this.formatServiceParameters(serviceList)
        }
        this.request.addServices(this.serviceParameters)
    }

    protected setRequiredFields() {
        for (const requiredField of this._requiredFields) {
            if (!this.getRequestData()[requiredField])
                this.request.setDataKey(requiredField, buckarooClient().getConfig()[requiredField])
        }
    }
    protected transactionRequest(requestData: ITransaction) {
        this.setRequest(requestData)

        return buckarooClient()
            .transactionRequest(this.getRequestData())
            .then((response) => {
                const transactionResponse = new TransactionResponse(response)
                if (transactionResponse.hasError()) {
                    throw new BuckarooError(transactionResponse)
                }
                return transactionResponse
            })
    }
    protected dataRequest(requestData) {
        this.setRequest(requestData)

        return buckarooClient()
            .dataRequest(this.getRequestData())
            .then((response) => {
                return new TransactionResponse(response)
            })
    }
    public combine(method: PaymentMethod) {
        if (method.combinable && this.combinable) {
            const data = method.getRequestData()
            if (data) {
                const services = { ...this.getRequestData().services }
                Object.assign(this.getRequestData(), data)
                if (services?.ServiceList) {
                    this.request.addServices(services.ServiceList[0])
                }
            }
        }
        return this
    }
    public setClientIp() {
        let ip = this.getRequestData().clientIP
        if (typeof ip === 'string') {
            this.request.setDataKey('clientIP', {
                type: IPProtocolVersion.getVersion(ip),
                address: ip
            })
        }
    }
    public specification(type?: RequestType) {
        return buckarooClient().specification(this.paymentName, this.serviceVersion, type)
    }

    private setBasicParameters(data) {
        let params = {}
        Object.keys(data).forEach((key) => {
            if (this.request.basicParameters[key]) {
                params[key] = data[key]
                delete data[key]
            }
        })
        this.request.setData(params)
        this.request.formatParameters()
        this.setClientIp()
    }
    public formatServiceParameters(data) {
        return this.modelStrategy.format(data)
    }
}
