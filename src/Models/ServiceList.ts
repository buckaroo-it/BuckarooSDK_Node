import {IParameter} from "./Parameters";

export declare interface IServices {
    ServiceList:IServiceList[]
}
export declare interface IServiceList {
    name: string
    action: string
    version:number
    parameters?: Array<IParameter>
}
export class ServiceList implements IServiceList{
    name: string
    action: string
    version:number
    parameters?: Array<IParameter>
    constructor(data) {
        this.name = data.name
        this.action = data.action
        this.version = data.version
        if (data.parameters){
            this.parameters = data.parameters
        }
    }
}

