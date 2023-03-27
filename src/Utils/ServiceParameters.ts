import {IParameter} from "../Models/Parameters";
import {firstUpperCase} from "./Functions";


export class ServiceParameters {
    data: any
    constructor(data) {
        this.data = {...data}
    }
    setGroupTypes(groupTypes:{[key: string]: string }){
        for (const key in groupTypes) {
            if (this.data[key]) {
                if (!(this.data[key] instanceof Object)) {
                    this.data[key] = {[key]: this.data[key]}
                }
                this.data[key].groupType = () => groupTypes[key]
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
    setKeys( keys:{[key: string]: string | {[key: string]: string }} , data = this.data){
        for (const key in keys) {
            if (data[key]) {
                if (typeof keys[key] === 'object') {
                    // this.setKeys(keys[key], data[key])
                    // if (data[key][keys[key]]) {
                    //     data[key][key] = data[key][keys[key]]
                    //     delete data[key][keys[key]]
                    }
                }else{
                }
                if(Array.isArray(data[key])) {
                    // this.data[key].forEach((item) => {
                    //     for (const key2 in keys[key]) {
                    //         if (item[key2]) {
                    //             item[keys[key][key2]] = item[key2]
                    //             delete item[key2]
                    //         }
                    //     }
                    // })
                }else{
                }
            }
    }
    static formatData(data:object,parameters:IParameter[] = [],groupType='',groupId = ''):IParameter[] {
        for (const key in data) {
            if (data[key] instanceof Object) {
                this.formatData(data[key], parameters,
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