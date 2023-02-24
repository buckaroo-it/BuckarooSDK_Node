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

    public setServices(serviceList:IServiceList) {
        this.getData().services = serviceList
    }

    public setData(key, data) {
        this.data[key] = data
    }
}