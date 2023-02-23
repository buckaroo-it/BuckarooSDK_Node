import {IParameter} from "./Parameters";

export declare interface IServiceList {
    name: string,
    action: string,
    parameters?: Array<IParameter>
}
export class ServiceList {
    name: string
    action: string
    parameters?: Array<IParameter>

    constructor(data:IServiceList) {
        this.name = data.name
        this.action = data.action
        if (data.parameters){
            this.parameters = data.parameters
        }
    }

}

