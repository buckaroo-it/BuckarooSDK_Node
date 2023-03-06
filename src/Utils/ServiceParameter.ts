import {serviceParameterKeyOf} from "./Functions";

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
    setObjectKeys(key,value) {
        if (this.data[key]) {
            delete Object.assign(this.data, {[value]: this.data[key]})[key]
        }
    }
    setKeys(keys: { [key: string]: string }){
        // if (typeof Array.isArray(this.data)){
        //     for (const keysKeyElement of this.data) {
        //         if (keysKeyElement instanceof ServiceParameter){
        //             keysKeyElement.setKeys(keys)
        //         }
        //     }
        // }else{
        //     for (const keysKey in keys) {
        //         if (this.data[keysKey]) {
        //             this.setObjectKeys(keysKey, keys[keysKey])
        //         }
        //     }
        // }
    }
}
export class ServiceParameterList {
    list:{[key:string]:ServiceParameter} = {}

    constructor(data:object) {
        for (const key of Object.keys(data)) {
            if(typeof data[key] !== 'undefined')
                this.list[key] = new ServiceParameter(data[key])
        }
    }
    setGroupTypes(groupTypes:any){
        for (const groupKey in groupTypes) {
            if (this.list[groupKey])
                this.list[groupKey].groupType = groupTypes[groupKey]
        }
    }
    setCountable(param:string){
       if (this.list[param]?.data instanceof ServiceParameterList){
           for (const paramKey in this.list[param]?.data.list) {
               this.list[param].data.list[paramKey].groupId = parseInt(paramKey)+1
           }
       }
    }
    formatServiceParameters(data:{}[] = [] , groupId:Number|string = '',groupType = ''){
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
}