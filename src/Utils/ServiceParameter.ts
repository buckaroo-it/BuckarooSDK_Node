import { serviceParameterKeyOf } from './Functions'
import { IParameter } from '../Models/Parameters'

export class ServiceParameter {
    data: any
    private _groupId: () => string | Number = () => ''
    private _groupType: () => string = () => ''

    constructor(data) {
        this.data = typeof data === 'object' ? new ServiceParameterList(data) : data
    }
    get groupId(): string | Number {
        return this._groupId()
    }
    set groupId(value: string | Number) {
        this._groupId = () => value
    }

    get groupType(): string {
        return this._groupType()
    }
    set groupType(value: string) {
        this._groupType = () => value
    }
    setKeys(keys: { [key: string]: string }) {
        if (this.data instanceof ServiceParameterList) {
            this.data.setKeys(keys)
        }
    }
}
export class ServiceParameterList {
    list: { [key: string]: ServiceParameter } = {};
    constructor(data: object = {}) {
        for (const key of Object.keys(data)) {
            if (typeof data[key] !== 'undefined') this.list[key] = new ServiceParameter(data[key])
        }
    }
    setGroupTypes(groupTypes: {[key:string]:string}){
        for (const groupKey in groupTypes) {
            if (this.list[groupKey]) this.list[groupKey].groupType = groupTypes[groupKey]
        }
    }
    setCountable(param: string) {
        let i = 1
        if (!this.list[param]) return
        if (!(this.list[param].data instanceof ServiceParameterList)) return
        for (const paramKey in this.list[param].data.list) {
            this.list[param].data.list[paramKey].groupId = i++
        }
    }
    isEmpty() {
        return Object.keys(this.list).length === 0
    }
    formatServiceParameters(
        data: IParameter[] = [],
        groupId: Number | string = '',
        groupType = ''
    ): IParameter[] {
        for (const paramsKey in this.list) {
            if (this.list[paramsKey].data instanceof ServiceParameterList) {
                this.list[paramsKey].data.formatServiceParameters(
                    data,
                    this.list[paramsKey].groupId || groupId,
                    this.list[paramsKey].groupType || groupType
                )
            } else {
                data.push({
                    Name: serviceParameterKeyOf(paramsKey),
                    Value: this.list[paramsKey].data,
                    GroupID: this.list[paramsKey].groupId || groupId,
                    GroupType: this.list[paramsKey].groupType || groupType
                })
            }
        }
        return data
    }

    setKeys(keys) {
        for (const param in this.list) {
            if (keys[param]) {
                delete Object.assign(this.list, { [keys[param]]: this.list[param] })[param]
            } else {
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

export class ServiceParameters {

    [data:string]:any
    private _groupId?: groupIdType
    private _groupType?: { type: string }

    get groupType(): string {
        switch (typeof this._groupType) {
            case 'object':
                return this._groupType.type
            default:
                return ''
        }
    }
    set groupType(value: string) {
        this._groupType = { type: value };
    }
    set groupId(value: groupIdType) {
        this._groupId = value
    }
    get groupId(): groupIdType{
        switch (typeof this._groupId) {
            case 'object':
                return this._groupId.next().value
            default:
                return <number>this._groupId
        }
    }
    constructor(data:object) {
         for (const dataKey in data) {
          this[dataKey] = typeof data[dataKey] === 'object'?
              new ServiceParameters(data[dataKey]):
              data[dataKey]
         }
    }
    searchParameters(param:string,params:any = []){
        let parameter = this[param]
        if(parameter) {
            params.push(this)
        }
        for (const paramKey of Object.keys(this)){
            if (this[paramKey] instanceof ServiceParameters){
                parameter = this[paramKey].searchParameters(param,params)
            }
        }
        return params
    }
    findParameter(param:string):ServiceParameters | undefined {
        if(this[param] instanceof ServiceParameters){
            return this[param]
        }
        for (const paramKey of Object.keys(this)) {
            if(typeof this[paramKey] === "object"){
                let parameter = this[paramKey].findParameter(param)
                if(parameter){
                    return parameter
                }
            }
        }
    }
    addParameter(param:object){
        for (const paramKey in param) {
           this[paramKey] = typeof param[paramKey] === 'object'?
                        new ServiceParameters(param[paramKey]):
                        param[paramKey]
        }
    }
    setGroupTypes(groupTypes: {[key:string]:string}){
        for (const groupKey in groupTypes) {
            let parameter = this.searchParameters(groupKey)
            for (const parameterElement of parameter) {
                if (!(parameterElement[groupKey] instanceof ServiceParameters))
                    parameterElement.addParameter({[groupKey]:{[groupKey]:parameterElement[groupKey]}})

                parameterElement[groupKey].groupType = groupTypes[groupKey]
            }
        }
    }
    makeCountable(param?:string){
        if(!param){
            this.groupId = count()
        }else {
            let parameter = this.searchParameters(param)
            for (const parameterElement of parameter) {
                if (!(parameterElement[param] instanceof ServiceParameters))
                    parameterElement.addParameter({[param]:{[param]:parameterElement[param]}})

                parameterElement[param].groupId = count()
            }
        }
    }
    formatServiceParameters(
        data: IParameter[] = [],
        groupId: groupIdType = '',
        groupType = ''
    ): IParameter[] {
        for (const paramsKey of Object.keys(this)) {
            if (this[paramsKey] instanceof ServiceParameters) {
                if(this._groupId){
                    groupId = this.groupId
                }
                this[paramsKey].formatServiceParameters(
                    data,
                    groupId,
                    this[paramsKey].groupType || groupType
                )
            } else if(typeof this[paramsKey] !== 'object') {
                data.push({
                    Name: serviceParameterKeyOf(paramsKey),
                    Value: this[paramsKey],
                    GroupID:  <number>groupId,
                    GroupType: groupType
                })
            }
        }
        return data
    }

}
function* count() {
    let index = 1;
    while (true) {
        yield index++;
    }
    return index;
}
type groupIdType = string | number | ReturnType<typeof count>