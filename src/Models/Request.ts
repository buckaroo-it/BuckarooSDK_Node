import {Payload, PayPayload} from "./Payload";
import {IServiceList} from "./ServiceList";
import {uniqid} from "../Utils/Functions";

export class Request{
    protected data: object = {}

    public getData(): object {
        return this.data
    }
    public getPayload(): Payload{
        return <Payload>this.data
    }

    public getPayPayload(): PayPayload{
        return <PayPayload>this.data
    }
}

export class TransactionRequest extends Request {

    public setPayload( payload: Payload) {
        this.data = payload
        this.getPayload().invoice = payload.invoice || uniqid()
    }

    public setServices(serviceList:IServiceList[]) {
        this.getPayload().services = {
            ServiceList : serviceList
        }
    }
    public addServices(serviceList:IServiceList[]) {
        if(!this.getPayload().services){
            this.setServices(serviceList)
        }else {
            for (const iServiceList of serviceList) {
                this.getPayload().services?.ServiceList.push(iServiceList)
            }
        }
    }
    public setData(key, data) {
        this.data[key] = data
    }
}