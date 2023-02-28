import { ITransaction } from './ITransaction'
import {IServiceList, IServices} from './ServiceList'

interface RequestData extends ITransaction{
    services?:IServices
}
export class Request {
    protected data: RequestData = {}

    public getData() {
        return this.data
    }
    requestParams:() => string[] = () => {
        return [
            'order',
            'amountDebit',
            'amountCredit',
            'additionalParameters',
            'clientIP',
            'continueOnIncomplete',
            'culture',
            'currency',
            'customParameters',
            'description',
            'invoice',
            'originalTransactionKey',
            'originalTransactionReference',
            'pushURL',
            'pushURLFailure',
            'returnURL',
            'returnURLCancel',
            'returnURLError',
            'returnURLReject',
            'services',
            'servicesExcludedForClient',
            'servicesSelectableByClient',
            'startRecurrent'
        ]
    }
}

export class TransactionRequest extends Request {

    public setData(data) {
        this.data = data
    }
    public setDataKey(key, data) {
        this.data[key] = data
    }
    public setServices(serviceList: IServiceList) {
        this.data.services = {
            ServiceList:[serviceList]
        }
    }
    public addServices(serviceList: IServiceList) {
        if (this.data?.services) {
            this.data.services.ServiceList.push(serviceList)
        } else {
            this.setServices(serviceList)
        }
    }
}