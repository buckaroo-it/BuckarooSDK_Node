import {IParameter} from "../Models/Parameters";
import {firstUpperCase} from "./Functions";


export class ServiceParameters<Type extends object> {
    protected data: Type
    constructor(data) {
        this.data = {...data}
    }
    setData(data:object) {
        this.data = {...this.data,...data}
    }
    getData() {
        return this.data
    }
    protected setGroupTypes(groupTypes){
        for (const key in groupTypes) {
            let dataKey = this.data[key]
            if (dataKey) {
                if (!(dataKey instanceof Object)) {
                    dataKey = Object.create({[key]: dataKey})
                }
                this.data[key].groupType = () => groupTypes[key]
            }
        }
    }
    protected setCountable(countable:string[]){
        for (const key of countable) {
            let dataKey = this.data[key]
            if (dataKey && Array.isArray(dataKey)) {
                dataKey.forEach((item, index) => {
                    item.groupId = () => index+1
                })
            }
        }
    }
    protected setKey(key:string,newKey:string,data = this.data){
        if (Array.isArray(data)) {
            data.forEach(item => {
                if(typeof item[key] !== 'undefined')
                    delete Object.assign(item, {[<string>newKey]: item[key]})[key]
            })
        }else {
            if(typeof data[key] !== 'undefined')
               delete Object.assign(data, {[newKey]: data[key]})[key]
        }
    }
    protected setKeys(keys:object, data = this.data){
        for (const key in keys) {
            let key2 = keys[key]
            if (key2 instanceof Object) {
                // @ts-ignore
                this.setKeys(key2, data[key])
            } else if(typeof key2 === 'string'){
                this.setKey(key, key2, data)
            }
        }
    }
    static formatData(data:object,parameters:IParameter[] = [],groupType='',groupId = ''):IParameter[] {
        for (const key in data) {
            if (data[key] instanceof Object) {
                this.formatData(Array.isArray(data[key])? {...data[key]} : data[key],
                    parameters,
                    data[key].groupType ? data[key].groupType() : groupType,
                    data[key].groupId ? data[key].groupId() : groupId)
            }else if(typeof data[key] !== 'function') {
                parameters.push({
                    Name: firstUpperCase(key),
                    Value: data[key],
                    GroupType:groupType,
                    GroupID: groupId
                })
            }
        }
        return parameters
    }
}