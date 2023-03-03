import Endpoints from '../Constants/Endpoints'
import hmac from './Hmac'
import HttpMethods from '../Constants/HttpMethods'
import httpClient from './HttpClient'
import { buckarooClient } from '../BuckarooClient'
import PaymentMethod from '../PaymentMethods/PaymentMethod'

class Client {
    getHeaders(method, data, url) {
        return {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json',
            Authorization: hmac.authHeader(url, method, data),
            Culture: 'en-GB'
        }
    }

    getOptions(method, url, data) {
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
        const baseUrl =
            buckarooClient().getConfig()?.mode === 'live' ? Endpoints.LIVE : Endpoints.TEST
        return baseUrl + path
    }

    getTransactionUrl(path: string = ''): string {
        return this.getEndpoint('json/Transaction') + path
    }

    getDataRequestUrl(path: string = ''): string {
        return this.getEndpoint('json/DataRequest') + path
    }

    getSpecificationUrl(paymentName, serviceVersion) {
        return this.getEndpoint(
            `json/Transaction/Specification/${paymentName}?serviceVersion=${serviceVersion}`
        )
    }

    get(url, data = '') {
        const options = this.getOptions(HttpMethods.METHOD_GET, url, data)
        return httpClient.call(options)
    }

    post(data, url) {
        const options = this.getOptions(HttpMethods.METHOD_POST, url, data)
        return httpClient.call(options)
    }

    specification(paymentName?: string, serviceVersion = 0) {
        const endPoint = this.getSpecificationUrl(paymentName, serviceVersion)

        return this.get(endPoint)
    }
    specifications(
        paymentMethods: PaymentMethod[] | PaymentMethod | { Name: string; Version: Number }[],
        type: 0 | 1 = 0
    ) {
        if (!Array.isArray(paymentMethods)) {
            paymentMethods = [paymentMethods]
        }
        let data: { Services: { Name: string; Version: string | Number }[] } = { Services: [] }
        for (const paymentMethod of paymentMethods) {
            if (paymentMethod instanceof PaymentMethod) {
                data.Services.push({
                    Name: paymentMethod.paymentName,
                    Version: paymentMethod.serviceVersion
                })
            } else if (paymentMethod.Name && paymentMethod.Version) {
                data.Services.push({
                    Name: paymentMethod.Name,
                    Version: paymentMethod.Version
                })
            }
        }

        const endPoint =
            type === 0
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
    dataRequest(data) {
        const endPoint = this.getDataRequestUrl()
        return this.post(data, endPoint)
    }
}

const client = new Client()
export default client
