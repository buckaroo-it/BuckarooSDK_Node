import { ITransaction } from './ITransaction'
import { IServiceList, IServices } from './ServiceList'
import { IParameter } from './Parameters'
import { firstUpperCase } from '../Utils/Functions'
import { AdditionalParameter } from '../Utils/Types'

export class Request {
    protected _data: {[key:string]:any} = {}
    get data(): object {
        return this._data
    }
    public get services(): IServices {
        return this._data['services']
    }
    public set services(services: IServices) {
        this._data['services'] = services
    }
    public setRequestDataKey(key, data) {
        this._data[key] = data
    }
}

export class TransactionRequest extends Request {
    get data(): ITransaction {
        return this._data
    }
    setData(data:ITransaction) {
        this._data = data
    }

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
        this.services = {ServiceList:[services]}
    }
    public addServices(serviceList: IServiceList) {
        if (this.services) {
            this.services.ServiceList.push(serviceList)
        } else {
            this.setServices(serviceList)
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
                return this.formatServiceParameters(data[name], {
                    ...types,
                    GroupID: 0,
                })
            }
            if (types.GroupID === parseInt(name)) {
                types.GroupID++
            }
            if (data[name] instanceof Object) {
                return this.formatServiceParameters(data[name], {
                    ...types,
                    GroupType: firstUpperCase(name) + (types.GroupType || '')
                })
            }

            return (typeof data[name] === 'undefined')  ? [] : {
                Name: firstUpperCase(name),
                Value: data[name],
                ...types
            }
        })
    }
}
