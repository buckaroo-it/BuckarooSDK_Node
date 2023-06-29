import { TransactionRequest } from '../Models/Request'
import { IConfig, ServiceParameters } from '../Utils/Types'
import { RequestType } from '../Constants/Endpoints'
import { ITransaction } from '../Models/ITransaction'
import buckarooClient from '../BuckarooClient'
import { IServiceList } from '../Models/ServiceList'
export default abstract class PaymentMethod {
    protected readonly _requiredFields: Array<keyof IConfig> = ['currency', 'pushURL']
    protected _paymentName = ''
    protected _serviceVersion = 0
    protected _request: TransactionRequest = new TransactionRequest()
    private _action = ''
    protected _serviceCodes:Array<string> = []
    get paymentName(): string {
        return this._paymentName
    }
    get request(): ITransaction {
        return this._request.data
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
    public setRequestAction(action:string) {
        this._request.services?.ServiceList.forEach((service) => {
            service.Action = action
        })
    }

    public setRequest(data: ITransaction  | (ITransaction & ServiceParameters) ) {
        this._request.setBasicParameters(data)

        this.setRequiredFields()

        this.setServiceParameters(this._request.filter(data))
    }

    protected setServiceParameters(serviceParameters: ServiceParameters) {
        let serviceList: IServiceList = {
            Action: this.action,
            Name: this.paymentName,
            Version: this.serviceVersion
        }
        if (Object.keys(serviceParameters).length > 0) {
            serviceList.Parameters = this._request.formatServiceParameters(serviceParameters)
        }
        this._request.addServices(serviceList)
    }

    protected setRequiredFields() {
        for (const requiredField of this._requiredFields) {
            if (!this._request.data[requiredField])
                this._request.data[requiredField] = buckarooClient().getConfig()[requiredField]
        }
    }
    protected transactionRequest(requestData: ITransaction | (ITransaction & ServiceParameters)  ){
        this.setRequest(requestData)

        return buckarooClient().transactionRequest(this._request.data)
    }
    protected dataRequest(requestData: ITransaction | (ITransaction & ServiceParameters) = {}) {
        this.setRequest(requestData)

        return buckarooClient().dataRequest(this._request.data)
    }
    public combine(method: PaymentMethod) {
        if (Object.keys(method._request.data).length > 0) {
            let services = this._request.services
            if (services && method._request.services) {
                method._request.services.ServiceList = services.ServiceList.concat(
                    method._request.services.ServiceList
                )
            }
            Object.assign(this._request.data, method._request.data)
        }
        return this
    }
    public specification(type?: RequestType) {
        return buckarooClient().specification(this.paymentName, this.serviceVersion, type)
    }
}
