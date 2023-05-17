import { ITransaction } from './ITransaction'
import { IServiceList, IServices } from './ServiceList'
import { IParameter } from './Parameters'
import { firstUpperCase } from '../Utils/Functions'
import {AdditionalParameter, ServiceParameters} from '../Utils/Types'
import { IPProtocolVersion } from '../Constants/IPProtocolVersion'

export class Request {
    private readonly _data: ITransaction

    constructor(data:ITransaction) {
        this._data = data
    }
    get data(): ITransaction {
        return this._data
    }
    getFormattedData():object {
        let data:any = {}
        if (this._data.additionalParameters) {
            data.additionalParameters = this.formatAdditionalParameters()
        }
        if (this._data.customParameters) {
            data.customParameters = this.formatCustomParameters()
        }
        if (this._data.clientIP) {
            data.clientIP = this.formatClientIp()
        }
        return data
    }
    formatAdditionalParameters() {
         return  {
            additionalParameter: this.formatParametersMap(this._data.additionalParameters)
        }
    }
    formatCustomParameters() {
        return {
            list: this.formatParametersMap(this._data.customParameters)
        }
    }
    public formatClientIp() {
        let ip = this._data.clientIP
        if (typeof ip === 'string') {
            ip = {
                type: IPProtocolVersion.getVersion(ip),
                address: ip
            }
        }
        return ip
    }
    protected formatParametersMap(value: AdditionalParameter = {}): IParameter[] {
        return Object.keys(value).map((key, value) => {
            return {
                Name: key,
                Value: value || ''
            }
        })
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
