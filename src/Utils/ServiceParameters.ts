import { IParameter } from '../Models/Parameters'
import { firstUpperCase } from './Functions'

export class ServiceParameters<Type extends object> {
    protected data: Type
    constructor(data) {
        this.data = { ...data }
    }
    setData(data: Type) {
        this.data = { ...this.data, ...data }
    }
    getData() {
        return this.data
    }
    protected setGroupTypes(groupTypes: object, data = this.data) {
        for (const key in groupTypes) {
            let dataKey = data[key]
            if (dataKey) {
                let key2 = groupTypes[key]
                if (key2 instanceof Object) {
                    this.setGroupTypes(key2, dataKey)
                } else {
                    if (!(dataKey instanceof Object))
                        Object.assign(data, { [key]: { [key]: dataKey } })
                    data[key].groupType = () => key2
                }
            }
        }
    }
    protected setCountable(countable: string[]) {
        for (const key of countable) {
            let dataKey = this.data[key]
            if (dataKey && Array.isArray(dataKey)) {
                dataKey.forEach((item, index) => {
                    item.groupId = () => index + 1
                })
            }
        }
    }
    protected setKey(
        key: string,
        newKey: string | boolean | ((data: any) => string | boolean),
        data = this.data
    ) {
        if (Array.isArray(data)) {
            data.forEach((item) => {
                this.setKey(key, newKey, item)
            })
        } else {
            if (typeof newKey === 'function') {
                newKey = newKey.apply(data, [data[key]])
            }
            switch (typeof newKey) {
                case 'string':
                    delete Object.assign(data, { [newKey]: data[key] })[key]
                    break;
                case 'boolean':
                    if (newKey === true && !data[key])
                        throw new Error(`Required parameter ${key} is not defined`)
                    break
                default:
                    data[key] = newKey
            }
        }
    }
    protected setKeys(keys: object, data = this.data) {
        for (const key in keys) {
            let key2 = keys[key]
            if (typeof key2 !== 'function' && key2 instanceof Object && data[key]) {
                this.setKeys(key2, data[key])
            } else {
                this.setKey(key, key2, data)
            }
        }
    }
    static formatData(
        data: object,
        parameters: IParameter[] = [],
        groupType = '',
        groupId = ''
    ): IParameter[] {
        for (const key in data) {
            if (data[key] instanceof Object) {
                this.formatData(
                    Array.isArray(data[key]) ? { ...data[key] } : data[key],
                    parameters,
                    data[key].groupType ? data[key].groupType() : groupType,
                    data[key].groupId ? data[key].groupId() : groupId
                )
            } else if (typeof data[key] !== 'function') {
                parameters.push({
                    Name: firstUpperCase(key),
                    Value: data[key],
                    GroupType: groupType,
                    GroupID: groupId
                })
            }
        }
        return parameters
    }
}
