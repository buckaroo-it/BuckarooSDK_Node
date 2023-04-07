import { ITransaction } from './ITransaction'
import { IServiceList, IServices } from './ServiceList'
import { IParameter } from './Parameters'
import { firstUpperCase } from '../Utils/Functions'
import { AdditionalParameter, ServiceParameter } from '../Utils/Types'

export class Request {
    protected _data: { [key: string]: any } = {}
    get data(): object {
        return this._data
    }
    public get services(): IServices | undefined {
        return this._data['services']
    }
    public setRequestDataKey(key, data) {
        this._data[key] = data
    }
}

export class TransactionRequest extends Request {
    get data(): ITransaction {
        return this._data
    }
    setData(data) {
        this._data = data
    }
    customParameters?: AdditionalParameter
    additionalParameters?: AdditionalParameter
    service?: {
        Name?: string
        Action?: string
        Version?: number
        Parameters?: IParameter[]
    }
    serviceParameters?: ServiceParameter
    public basicParameters: Record<keyof ITransaction, boolean> = {
        clientIP: true,
        currency: true,
        returnURL: true,
        returnURLError: true,
        returnURLCancel: true,
        returnURLReject: true,
        pushURL: true,
        pushURLFailure: true,
        invoice: true,
        order: true,
        amountDebit: true,
        amountCredit: true,
        description: true,
        originalTransactionKey: true,
        originalTransactionReference: true,
        culture: true,
        startRecurrent: true,
        continueOnIncomplete: true,
        servicesSelectableByClient: true,
        servicesExcludedForClient: true,
        customParameters: true,
        additionalParameters: true
    }
    public setServices(services: IServiceList) {
        this.setRequestDataKey('services', {
            ServiceList: [services]
        })
    }
    public addServices() {
        if (this.service) {
            if (this.services) {
                this.services.ServiceList.push(this.service)
            } else {
                this.setServices(this.service)
            }
        }
    }
    formatAdditionalParameters() {
        if (this.data.additionalParameters) {
            this.setRequestDataKey('additionalParameters', {
                additionalParameter: this.formatParametersMap(this.data.additionalParameters)
            })
        }
    }
    formatCustomParameters() {
        if (this.data.customParameters) {
            this.setRequestDataKey('customParameters', {
                list: this.formatParametersMap(this.data.customParameters)
            })
        }
    }
    protected formatParametersMap(value: AdditionalParameter): IParameter[] {
        return Object.keys(value).map((key, value) => {
            return {
                Name: key,
                Value: value || ''
            }
        })
    }

    formatServiceParameters(data: object, types: { GroupType?: string; GroupID?: number } = {}) {
        return Object.keys(data).flatMap((name) => {
            if (Array.isArray(data[name])) {
                types.GroupID = 0
                return this.formatServiceParameters(data[name], types)
            }
            if (data[name] instanceof Object) {
                types.GroupType = firstUpperCase(name)
                if (types.GroupID === parseInt(name)) {
                    types.GroupID++
                }
                return this.formatServiceParameters(data[name], types)
            }
            return {
                Name: firstUpperCase(name),
                Value: data[name],
                ...types
            }
        })
    }
}
