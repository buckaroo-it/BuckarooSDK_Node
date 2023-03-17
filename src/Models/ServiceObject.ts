import { firstLowerCase } from '../Utils/Functions'


export class ServiceObject {
    [data: string]: any
    constructor(data: object) {
        this.addParameter(data)
    }
    addParameter(parameters: object, classType = ServiceObject) {

            for (const [key, value] of  Object.entries(parameters)){
                if (value instanceof ServiceObject) {
                    this[firstLowerCase(key)] = value
                } else if (value && typeof value === 'object') {
                    this[firstLowerCase(key)] = new classType(value)
                } else if (typeof value !== 'function') {
                    this[firstLowerCase(key)] = value
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
        if (find) {
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
        for (const parameterKey in keys) {
            let parameters = this.getParametersByName(parameterKey)
            if (parameters.length> 0){
                for (const parameter of parameters) {
                    delete Object.assign(parameter, { [keys[parameterKey]]: parameter[parameterKey] })[parameterKey]
                }
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
            .forEach((value) => {
                if (value[0] == param) {
                    parameters.push(this)
                } else if(value[1] instanceof ServiceObject){
                    value[1].getParametersByName(param, parameters)
                }
            })
        return parameters
    }
}