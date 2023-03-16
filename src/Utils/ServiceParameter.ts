import { firstUpperCase } from './Functions'
import { IParameter } from '../Models/Parameters'
import { ServiceObject } from '../Models/ServiceObject'

export class ServiceParameters extends ServiceObject {
    private _groupId?: () => groupIdType
    private _groupType?: () => string
    constructor(data: object) {
        super(data)
    }
    set groupType(value: string) {
        this._groupType = () => value
    }
    private set groupId(value: groupIdType) {
        this._groupId = () => value
    }
    get groupType(): string {
        return this._groupType?.() || ''
    }
    private get groupId(): groupIdType {
        let id = this._groupId?.()
        switch (typeof id) {
            case 'object':
                return id.next().value
            case 'undefined':
                return ''
            default:
                return id
        }
    }
    addParameter(value: object) {
        super.addParameter(value, ServiceParameters)
    }
    setGroupType(type: string, key?: string) {
        if (!key) {
            this.groupType = type
            return this
        } else {
            let parameter = this.findParameterParent(key)
            if (parameter) {
                if (!(parameter[key] instanceof ServiceParameters)) {
                    parameter.addParameter({ [key]: { [key]: parameter[key] } })
                }
                parameter[key].groupType = type
                return parameter[key]
            }
        }
    }
    setGroupId(id: string, key?: string) {
        if (!key) {
            this.groupId = id
        } else {
            let parameter = this.findParameterParent(key)
            if (parameter) {
                if (!(parameter[key] instanceof ServiceParameters)) {
                    parameter.addParameter({ [key]: { [key]: parameter[key] } })
                }
                parameter[key].groupId = id
                return parameter[key]
            }
        }
    }
    setObjectGroupTypes(groupTypes: { [key: string]: string }) {
        for (const groupKey in groupTypes) {
            let parameter = this.getParametersByName(groupKey)
            for (const parameterElement of parameter) {
                parameterElement.groupType = groupTypes[groupKey]
            }
        }
    }
    makeCountable(param?: string) {
        if (!param) {
            this.groupId = count()
        } else {
            let parameter = this.getParametersByName(param)
            for (const parameterElement of parameter) {
                parameterElement.groupId = count()
            }
        }
    }
    static toServiceParameterList(
        services: object | ServiceParameters,
        parameters: IParameter[] = [],
        groupType = '',
        groupId: groupIdType = ''
    ): IParameter[] {
        for (const serviceKey of Object.keys(services)) {
            if (typeof services[serviceKey] === 'object') {
                this.toServiceParameterList(
                    services[serviceKey],
                    parameters,
                    services[serviceKey].groupType || groupType,
                    services[serviceKey].groupId ||
                        (services instanceof ServiceParameters ? services.groupId : groupId)
                )
            } else if (typeof services[serviceKey] !== 'function') {
                parameters.push({
                    Name: firstUpperCase(serviceKey),
                    Value: services[serviceKey],
                    GroupID: <string>groupId,
                    GroupType: groupType
                })
            }
        }
        return parameters
    }
    findParameter(param: string): ServiceParameters | undefined {
        return super.findParameter(param)
    }
}
function* count() {
    let index = 0
    while (true) {
        yield index++
    }
}
type groupIdType = string | number | Generator
