import {Payload} from "./Payload";
import {IServiceList} from "./ServiceList";

export class Request{
    protected data: object = {}

    public getData(): Payload {
        return <Payload>this.data
    }
}

export class TransactionRequest extends Request {

    public setPayload(payload: Payload ) {
        this.data = payload
    }

    public setServices(serviceList:IServiceList[]) {

        this.getData().services = {
            ServiceList : serviceList
        }
    }
    public addServices(serviceList:IServiceList[]) {
        if(!this.getData().services){
            this.setServices(serviceList)
        }else {
            for (const iServiceList of serviceList) {
                this.getData().services?.ServiceList.push(iServiceList)
            }
        }
    }
    public setData(key, data) {
        this.data[key] = data
    }
}