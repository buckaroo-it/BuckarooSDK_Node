import Ideal from "../methods/ideal";
import Parameters from "./Parameters";

export default class Services {
    public serviceList:Array<any> = []
    constructor(data, model, action,pay) {
        this.serviceList.push(this.formatServices(data, model,action,pay))
    }
    formatServices(data,model,action,pay){
        let formatedService = {
            parameters:{}[''],
            name:model.paymentName,
            version:model.serviceVersion,
            action:action
        }
        let parameters = new Parameters(pay,data).parameterList
        formatedService.parameters = parameters
        return formatedService
    }
}