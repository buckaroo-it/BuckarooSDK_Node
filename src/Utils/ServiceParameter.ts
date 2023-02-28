import {serviceParameterKeyOf} from "./Functions";
import {IParameter} from "../Models/Parameters";

export class ServiceParameter {
    data: any
    private _groupId: (() => string | Number) = () => ''
    private _groupType:(() => string) = () => ''

    constructor(data) {
        this.data = typeof data === 'object' ?  new ServiceParameterList(data) : data
    }
    get groupId(): string | Number {
        return this._groupId();
    }
    set groupId(value:string | Number) {
        this._groupId =  () => value;
    }

    get groupType(): string {
        return this._groupType();
    }
    set groupType(value: string) {
        this._groupType = () => value;
    }
    setKeys(keys: { [key: string]: string }){
        if (this.data instanceof ServiceParameterList){
            this.data.setKeys(keys)
        }
    }
}
export class ServiceParameterList {
    list:{[key:string]:ServiceParameter} = {};
    [index:string] : any
    constructor(data:object = {}) {
        for (const key of Object.keys(data)) {
            if(typeof data[key] !== 'undefined')
                this.list[key] = new ServiceParameter(data[key])
        }
    }
    // getParameter(param:string){
    //     return this.list[param]
    // }
    setGroupTypes(groupTypes:any){
        for (const groupKey in groupTypes) {
            if (this.list[groupKey])
                this.list[groupKey].groupType = groupTypes[groupKey]
        }
    }
    setCountable(param:any){
        let i = 1
        for (const paramKey in this.list[param].data.list) {
            this.list[param].data.list[paramKey].groupId = i++
        }
    }
    isEmpty(){
        return Object.keys(this.list).length === 0
    }
    formatServiceParameters(data:IParameter[] = [] , groupId:Number|string = '', groupType = ''):IParameter[]{
        for (const paramsKey in this.list) {
            if (this.list[paramsKey].data instanceof ServiceParameterList) {
                this.list[paramsKey].data.formatServiceParameters(
                    data,
                    this.list[paramsKey].groupId || groupId,
                    this.list[paramsKey].groupType || groupType,
                )
            }
            else{
                data.push({
                    Name:serviceParameterKeyOf(paramsKey),
                    Value:this.list[paramsKey].data,
                    GroupID:this.list[paramsKey].groupId || groupId,
                    GroupType:this.list[paramsKey].groupType || groupType
                })
            }
        }
        return data
    }

    setKeys(keys){
        for (const param in this.list) {
            if(keys[param]){
                delete Object.assign(this.list, {[keys[param]]: this.list[param]})[param]
            }else{
                this.list[param].setKeys(keys)
            }
        }
    }
    // flattenList(obj = {}){
    //     for (const listKey in this.list) {
    //         if(this.list[listKey].data instanceof ServiceParameterList){
    //             obj[listKey] = {}
    //             this.list[listKey].data.flattenList(obj[listKey])
    //         }else if(typeof this.list[listKey].data !=='object') {
    //             obj[listKey] = this.list[listKey].data
    //         }
    //         if(this.list[listKey].groupId){
    //             obj[listKey]['groupId'] = this.list[listKey].groupId
    //         }
    //         if(this.list[listKey].groupType){
    //             obj[listKey]['groupType'] = this.list[listKey].groupType
    //         }
    //     }
    //     return obj
    // }
}