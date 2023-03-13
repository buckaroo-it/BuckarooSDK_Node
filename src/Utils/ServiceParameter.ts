import { serviceParameterKeyOf } from './Functions'
import { IParameter } from '../Models/Parameters'

export class ServiceParameters {

    [data:string]:any
    private _groupId?: () => groupIdType
    private _groupType?: () => string

    private set groupType(value: string) {
        this._groupType = () => value
    }
    private set groupId(value: groupIdType) {
        this._groupId = () => value
    }
    get groupType(): string {
       return this._groupType?.() || ''
    }
    private get groupId():groupIdType {
        let id = this._groupId?.()
        switch (typeof id) {
            case 'object':
                return id.next().value
            case "undefined":
                return ''
            default:
                return id
        }
    }
    constructor(data:object) {
        if (typeof data === 'object') {
            this.addParameter(data)
        }
    }
    setGroupType(type:string,key?:string){
        if (!key){
            this.groupType = type
        }else {
            let parameter =  this.findParameter(key)
            if (parameter){
                if (!(parameter[key] instanceof ServiceParameters)){
                    parameter.addParameter({[key]: {[key]:parameter[key]}})
                }
                parameter[key].groupType = type
            }
        }
        return this
    }
    setGroupId(id:string,key?:string){
        if (!key){
            this.groupId = id
        }else {
            let parameter =  this.findParameter(key)
            if (parameter){
                if (!(parameter[key] instanceof ServiceParameters)){
                    parameter.addParameter({[key]: {[key]:parameter[key]}})
                }
                parameter[key].groupId = id
            }
        }
    }
    searchParameterObjects(param:string,parameters:any = []):ServiceParameters[]{
        Object.entries(this)
            .filter(a => a[1] instanceof ServiceParameters)
            .forEach((value) => {
            if (value[0] === param) {
                parameters.push(value[1])
            } else {
                value[1].searchParameterObjects(param,parameters)
            }
        })
        return parameters
    }
    private findParameter(param:string):ServiceParameters | undefined {
        if(this[param]){
            return this
        }
        let tree = Object.values(this).filter(a => a instanceof ServiceParameters)
        if(tree.length>0){
            return tree.reduceRight((ac,value) => {
                return value.findParameter(param)
            })
        }
    }
    find(param:string):ServiceParameters | undefined {
        if(this[param] instanceof ServiceParameters){
            return this[param]
        }
    }
    addParameter(value:object){
        for (const paramKey in value) {
            if (value[paramKey] instanceof ServiceParameters){
                this[paramKey] = value[paramKey]
            }else if (typeof value[paramKey] === 'object'){
                this[paramKey] = new ServiceParameters(value[paramKey])
            }else {
                this[paramKey] = value[paramKey]
            }
        }
    }
    setObjectGroupTypes(groupTypes: {[key:string]:string}){
        for (const groupKey in groupTypes) {
            let parameter = this.searchParameterObjects(groupKey)
            for (const parameterElement of parameter) {
                parameterElement.groupType = groupTypes[groupKey]
            }
        }
    }
    makeCountable(param?:string){
        if(!param){
            this.groupId =  count()
        } else {
            let parameter = this.searchParameterObjects(param)
            for (const parameterElement of parameter) {
                parameterElement.groupId = count()
            }
        }
    }
    setKeys(keys:{[key:string]:string}){
        for (const parameterKey in this) {
            if (keys[parameterKey]) {
                delete Object.assign(this, { [keys[parameterKey]]: this[parameterKey] })[parameterKey]
            }else if(typeof this[parameterKey] === 'object'){
                this[parameterKey].setKeys(keys)
            }
        }
    }
    static formatServiceParameters(
        services:object | ServiceParameters,
        parameters: IParameter[] = [],
        groupType = '',
        groupId:groupIdType = '',
    ): IParameter[] {

        for (const serviceKey of Object.keys(services)) {
            if (services[serviceKey] instanceof ServiceParameters) {

                this.formatServiceParameters(
                    services[serviceKey],
                    parameters,
                    services[serviceKey].groupType || groupType,
                    services[serviceKey].groupId
                    ||
                    ((services instanceof ServiceParameters) ? services.groupId: groupId)
                    )
            } else if(typeof services[serviceKey] !== 'function') {
                parameters.push({
                    Name: serviceParameterKeyOf(serviceKey),
                    Value: services[serviceKey],
                    GroupID: <string>groupId,
                    GroupType: groupType
                })
            }
        }
        return parameters
    }

}
function* count() {
    let index = 0;
    while (true) {
        yield index++;
    }
}
type groupIdType = string | number | Generator