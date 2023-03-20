import Endpoints, { RequestType } from '../Constants/Endpoints'
import hmac from './Hmac'
import HttpMethods from '../Constants/HttpMethods'
import httpsCall from './HttpClient'
import { buckarooClient } from '../BuckarooClient'
import PaymentMethod from '../PaymentMethods/PaymentMethod'
import headers from './Headers'
import {ITransaction} from "../Models/ITransaction";

class Client {
    private constructor() {}

    static initialize(config, credentials) {
        if (!config || !credentials)
            throw new Error('Initialize Buckaroo Client with credentials!!')
        return new Client()
    }
    getHeaders(method, data, url) {
        headers.addHeader('Authorization', hmac(method, url, data))
        return headers.getHeaders()
    }
    getOptions(method: HttpMethods, url: string | URL, data: string) {
        url = new URL(url)
        return {
            hostname: url.host,
            path: url.pathname + url.search,
            method,
            headers: this.getHeaders(method, data, url.href),
            data
        }
    }

    private getEndpoint(path: string) {
        const baseUrl =
            buckarooClient().getConfig()?.mode === 'live' ? Endpoints.LIVE : Endpoints.TEST
        return baseUrl + path
    }

    private getTransactionUrl(path: string = ''): string {
        return this.getEndpoint('json/Transaction') + path
    }

    private getDataRequestUrl(path: string = ''): string {
        return this.getEndpoint('json/DataRequest') + path
    }

    protected getSpecificationUrl(
        paymentName,
        serviceVersion,
        type: RequestType = RequestType.Transaction
    ) {
        return type === RequestType.Transaction
            ? this.getTransactionUrl(
                  `/Specification/${paymentName}?serviceVersion=${serviceVersion}`
              )
            : this.getDataRequestUrl(
                  `/Specification/${paymentName}?serviceVersion=${serviceVersion}`
              )
    }

    private get(url, data = '') {
        const options = this.getOptions(HttpMethods.METHOD_GET, url, data)
        return httpsCall(options)
    }

    private post(data, url) {
        const options = this.getOptions(HttpMethods.METHOD_POST, url, data)

        return httpsCall(options)
    }

    transactionRequest(data:ITransaction) {
        const endPoint = this.getTransactionUrl()
        return this.post(data, endPoint)
    }
    dataRequest(data:ITransaction) {
        const endPoint = this.getDataRequestUrl()
        return this.post(data, endPoint)
    }
    specification(paymentName: string, serviceVersion = 0, type?: RequestType) {
        const endPoint = this.getSpecificationUrl(paymentName, serviceVersion, type)
        return this.get(endPoint)
    }
    specifications(
        paymentMethods: PaymentMethod[] | { name: string; version: Number }[],
        type: RequestType = RequestType.Transaction
    ) {
        let data: { Services: { Name: string; Version: string | Number }[] } = { Services: [] }

        for (const paymentMethod of paymentMethods) {
            if (paymentMethod instanceof PaymentMethod) {
                data.Services.push({
                    Name: paymentMethod.paymentName,
                    Version: paymentMethod.serviceVersion
                })
            } else if (paymentMethod.name && paymentMethod.version) {
                data.Services.push({
                    Name: paymentMethod.name,
                    Version: paymentMethod.version
                })
            }
        }

        const endPoint =
            type === RequestType.Transaction
                ? this.getTransactionUrl('/Specifications')
                : this.getDataRequestUrl('/Specifications')

        return this.post(data, endPoint)
    }
    getPaymentStatus(transactionKey) {
        const endPoint = this.getTransactionUrl(`/Status/${transactionKey}`)
        return this.get(endPoint)
    }
    getPaymentCancelStatus(transactionKey) {
        const endPoint = this.getTransactionUrl(`/Cancel/${transactionKey}`)
        return this.get(endPoint)
    }
    getPaymentRefundInfo(transactionKey) {
        const endPoint = this.getTransactionUrl(`/RefundInfo/${transactionKey}`)
        return this.get(endPoint)
    }
    getPaymentInvoiceInfo(invoiceKey) {
        const endPoint = this.getTransactionUrl(`/InvoiceInfo/${invoiceKey}`)
        return this.get(endPoint)
    }
}
export default Client
