import { firstLowerCase } from '../Utils/Functions'

export class ServiceObject {
    [data: string]: any
    protected constructor(data: object) {
        this.addParameter(data)
    }
    addParameter(value: object, classType = ServiceObject) {
        for (const paramKey in value) {
            if (value[paramKey] instanceof ServiceObject) {
                this[firstLowerCase(paramKey)] = value[paramKey]
            } else if (typeof value[paramKey] === 'object') {
                this[firstLowerCase(paramKey)] = new classType(value[paramKey])
            } else if (typeof value[paramKey] !== 'function') {
                this[firstLowerCase(paramKey)] = value[paramKey]
            }
        }
    }
    findParameter(param: string): any | undefined {
        let find = this.findParameterParent(param)
        if (find && find[param] instanceof ServiceObject) {
            return find[param]
        }
    }
    find(param: string): any | undefined {
        let find = this.findParameterParent(param)
        if (find && find[param]) {
            return find[param]
        }
    }
    findParameterParent(param: string): this | undefined {
        if (this[param]) {
            return this
        }
        let tree = Object.values(this).filter(
            (a) => a instanceof ServiceObject && Object.keys(a).length > 0
        )
        if (tree.length > 0) {
            for (const treeElement of tree) {
                let parameter = treeElement.findParameterParent(param)
                if (parameter) {
                    return parameter
                }
            }
        }
    }
    setParameterKeys(keys: { [key: string]: string }) {
        for (const parameterKey in this) {
            if (keys[parameterKey]) {
                delete Object.assign(this, { [keys[parameterKey]]: this[parameterKey] })[
                    parameterKey
                ]
            } else if (typeof this[parameterKey] === 'object') {
                this[parameterKey].setParameterKeys(keys)
            }
        }
    }
    removeParameterKeys(keys: string[]) {
        for (const key of keys) {
            let parameter = this.findParameterParent(key)
            if (parameter) {
                delete this[key]
            }
        }
    }

    getParametersByName(param: string, parameters: any = []): this[] {
        Object.entries(this)
            .filter((a) => a[1] instanceof ServiceObject)
            .forEach((value) => {
                if (value[0] == param) {
                    parameters.push(value[1])
                } else {
                    value[1].getParametersByName(param, parameters)
                }
            })
        return parameters
    }
}
