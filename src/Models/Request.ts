import { Payload } from './Payload'
import { IServiceList } from './ServiceList'
import { uniqid } from '../Utils/Functions'

export class Request {
    protected data: object = {}

    public getData(): object {
        return this.data
    }
    public getPayload(): Payload {
        return <Payload>this.data
    }
}

export class TransactionRequest extends Request {
    public setPayload(payload: Payload) {
        this.data = payload
        this.getPayload().invoice = payload.invoice || uniqid()
    }

    public setServices(serviceList: IServiceList[]) {
        this.getPayload().services = {
            ServiceList: serviceList
        }
    }
    getServiceList(): Array<object> {
        return this.getPayload().services?.ServiceList || []
    }
    public addServices(serviceList: IServiceList[]) {
        if (!this.getPayload().services) {
            this.setServices(serviceList)
        } else {
            for (const serviceListObject of serviceList) {
                this.getPayload().services?.ServiceList.push(serviceListObject)
            }
        }
    }
    public filterServices(data, services) {
        const serviceKeys = Object.keys(services)
        for (const serviceKey of serviceKeys) {
            delete data[serviceKey]
        }
        return data
    }
    public setData(key, data) {
        this.data[key] = data
    }
}
