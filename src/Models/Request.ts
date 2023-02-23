import {Payload} from "./Payload";
import {IServiceList} from "./ServiceList";

export class Request{
    protected data:  Partial<Payload> = {}

    public getData(): Partial<Payload>   {
        return this.data
    }
}

export class TransactionRequest extends Request {

    public setPayload(payload: Payload ) {
        this.data = payload
    }

    public setServiceParameters(serviceParameters:IServiceList) {
        this.data.services = serviceParameters
    }

    public setData(key, data) {
        this.data[key] = data
    }
}