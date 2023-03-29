import {IParameter} from "../Models/Parameters";
import {firstUpperCase} from "./Functions";
import {Subset} from "./Types";

type keys = {[key: string]: string}

type keyLoop = {[key: string]:  keyLoop | string }

export class ServiceParameters {
    data: any
    constructor(data) {
        this.data = {...data}
    }
    setGroupTypes(groupTypes:keys, data = this.data){
        for (const key in groupTypes) {
            if (data[key]) {
                if (!(data[key] instanceof Object)) {
                    data[key] = {[key]: data[key]}
                }
                data[key].groupType = () => groupTypes[key]
            }
        }
    }
    setGroupIds(groupIds:{[key: string]: string | Number }){
        for (const key in groupIds) {
            if (this.data[key]) {
                if (!(this.data[key] instanceof Object)) {
                    this.data[key] = {[key]: this.data[key]}
                }
                this.data[key].groupId = () => groupIds[key]
            }
        }
    }
    setCountable(countable:string[]){
        for (const key of countable) {
            if (this.data[key] && Array.isArray(this.data[key])) {
                this.data[key].forEach((item, index) => {
                    item.groupId = () => index+1
                })
            }
        }
    }
    setKey(key:string,newKey:string,data:object = this.data){
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
    setKeys( keys:keyLoop, data = this.data){
        for (const key in keys) {
            let key2 = keys[key]
            if (key2 instanceof Object) {
                if (!(data[key] instanceof Object)) continue
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