import {IParameter} from "./Parameters";

export declare interface IServiceList {
    ServiceList:[ServiceList]
}
export class ServiceList {
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

