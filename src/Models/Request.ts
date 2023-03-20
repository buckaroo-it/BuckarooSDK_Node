import { ITransaction } from './ITransaction'
import { IServiceList, IServices } from './ServiceList'

export interface RequestData extends ITransaction {
    services?: IServices
}
export class Request {
    protected data: RequestData = {}

    public getData() {
        return this.data
    }
    public basicParameters: Record<keyof RequestData, boolean> = {
        services: true,
        clientIP: true,
        currency: true,
        returnURL: true,
        returnURLError: true,
        returnURLCancel: true,
        returnURLReject: true,
        pushURL: true,
        pushURLFailure: true,
        invoice: true,
        order: true,
        amountDebit: true,
        amountCredit: true,
        description: true,
        originalTransactionKey: true,
        originalTransactionReference: true,
        culture: true,
        startRecurrent: true,
        continueOnIncomplete: true,
        servicesSelectableByClient: true,
        servicesExcludedForClient: true,
        customParameters: true,
        additionalParameters: true
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
            ServiceList: [serviceList]
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
