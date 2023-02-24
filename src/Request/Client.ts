import Endpoints from '../Constants/Endpoints'
import hmac from './Hmac'
import HttpMethods from '../Constants/HttpMethods'
import httpClient from './HttpClient'
import { buckarooClient } from "../BuckarooClient";

class Client {

    getHeaders(method, data, url) {
        return {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json',
            Authorization: hmac.authHeader(url, method, data),
            Culture: 'en-GB'
        }
    }

    getOptions(method, url,data) {
        url = new URL(url)
        return {
            hostname: url.host,
            path: url.pathname + url.search,
            method,
            headers: this.getHeaders(method, data, url.href),
            data
        }
    }

    getEndpoint(path: string) {
        const baseUrl = buckarooClient().getConfig()?.mode === 'live' ? Endpoints.LIVE : Endpoints.TEST
        return baseUrl + path
    }

    getTransactionUrl(): string {
        return this.getEndpoint('json/Transaction')
    }

    getDataRequestUrl(): string {
        return this.getEndpoint('json/DataRequest')
    }

    getSpecificationUrl(paymentName, serviceVersion) {
        return this.getEndpoint(
            `json/Transaction/Specification/${paymentName}?serviceVersion=${serviceVersion}`
        )
    }

    get(url,data = '') {
        const options = this.getOptions(HttpMethods.METHOD_GET, url,data)
        return  httpClient.call(options)
    }

    post(data, url) {
        const options = this.getOptions(HttpMethods.METHOD_POST, url,data)
        return  httpClient.call(options)
    }

    specification(paymentName?: string, serviceVersion = 0): Promise<any> {
        const endPoint = this.getSpecificationUrl(paymentName, serviceVersion)

        return this.get(endPoint)
    }
    getPaymentStatus(transactionKey){
        const endPoint = this.getEndpoint(`json/Transaction/Status/${transactionKey}`)
        return this.get(endPoint)
    }
    getPaymentCancelStatus(transactionKey){
        const endPoint = this.getEndpoint(`json/Transaction/Cancel/${transactionKey}`)
        return this.get(endPoint)
    }
    getPaymentRefundInfo(transactionKey){
        const endPoint = this.getEndpoint(`json/Transaction/RefundInfo/${transactionKey}`)
        return this.get(endPoint)
    }
    getPaymentInvoiceInfo(invoiceKey){
        const endPoint = this.getEndpoint(`json/Transaction/InvoiceInfo/${invoiceKey}`)
        return this.get(endPoint)
    }
}

const client = new Client()
export default client
