import { ITransaction } from './ITransaction'
import { IServiceList, IServices } from './ServiceList'
import { IParameter } from './Parameters'
import { firstUpperCase } from '../Utils/Functions'
import { AdditionalParameter, ServiceParameters } from '../Utils/Types'
import { IPProtocolVersion } from '../Constants/IPProtocolVersion'

export class Request {
    protected _data: { [key: string]: any } = {}
    get data(): object {
        return this._data
    }
    public setRequestDataKey(key: string, data: any) {
        this._data[key] = data
    }
    public filter(data: ServiceParameters) {
        return Object.keys(data)
            .filter((key) => this._data[key] === undefined && data[key] !== undefined)
            .reduce((obj: ServiceParameters, key) => {
                obj[key] = data[key]
                return obj
            }, {})
    }
}

export class TransactionRequest extends Request {
    get data(): ITransaction {
        return this._data
    }
    public get services(): IServices | undefined {
        return this._data['services']
    }
    public set services(services: IServices | undefined) {
        this._data['services'] = services
    }
    public setServices(services: IServiceList) {
        this.services = { ServiceList: [services] }
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
    public setBasicParameters(data: ITransaction) {
        for (const key in data) {
            if (this.basicParameters[key]) {
                this._data[key] = data[key]
            }
        }
        this.formatAdditionalParameters()
        this.formatCustomParameters()
        this.setClientIp()
    }

    public setClientIp() {
        let ip = this.data.clientIP
        if (ip && typeof ip === 'string') {
            this.setRequestDataKey('clientIP', {
                type: IPProtocolVersion.getVersion(ip),
                address: ip
            })
        }
    }
    public formatServiceParameters(
        data: ServiceParameters,
        groups: { GroupID?: number; GroupType: string } = { GroupType: '' },
        parentKey: string = '',
        parameters: IParameter[] = []
    ): IParameter[] {
        for (const key in data) {
            let value = data[key]
            if (typeof value !== 'undefined') {
                let name: string | number = firstUpperCase(key)

                if (groups.GroupID === parseInt(key)) {
                    groups.GroupID++
                    name = parseInt(key)
                }
                if (Array.isArray(value)) {
                    this.formatServiceParameters(
                        <ServiceParameters>(<unknown>value),
                        {
                            ...groups,
                            GroupID: 0
                        },
                        key,
                        parameters
                    )
                } else if (value instanceof Object) {
                    this.formatServiceParameters(
                        value,
                        {
                            ...groups,
                            GroupType:
                                typeof name === 'string'
                                    ? name + groups.GroupType
                                    : firstUpperCase(parentKey) + groups.GroupType
                        },
                        key,
                        parameters
                    )
                } else {
                    parameters.push({
                        Name: typeof name === 'string' ? name : firstUpperCase(parentKey),
                        Value: value,
                        ...groups
                    })
                }
            }
        }
        return parameters
    }
}
