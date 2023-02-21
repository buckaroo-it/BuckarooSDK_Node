import Endpoints from '../Constants/Endpoints'
import hmac from './Hmac'
import HttpMethods from '../Constants/HttpMethods'
import api from '../index'
import httpClient from './HttpClient'

class Client {
    getHeaders(method, data, url) {
        return {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json',
            Authorization: hmac.authHeader(url, method, data),
            Culture: 'en-GB'
        }
    }

    getOptions(data, method, url) {
        url = new URL(url)
        if (typeof data === 'object') {
            if (Object.keys(data).length === 0) {
                data = ''
            }
        }

        return {
            hostname: url.host,
            path: url.pathname + url.search,
            method,
            headers: this.getHeaders(method, data, url.href),
            data
        }
    }

    getEndpoint(path: string) {
        const baseUrl = api.config?.isLiveMode() ? Endpoints.LIVE : Endpoints.TEST

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

    async get(data, url) {
        this.call(data, HttpMethods.METHOD_GET, url).then((r) => r)
    }

    async post(data, url) {
        return await this.call(data, HttpMethods.METHOD_POST, url)
    }

    async specification(data?: {}, paymentName?: string, serviceVersion = 0): Promise<any> {
        const endPoint = this.getSpecificationUrl(paymentName, serviceVersion)

        return await this.call(data, HttpMethods.METHOD_GET, endPoint)
    }

    async call(data, method, url) {
        if (typeof data === 'object' && Object.keys(data).length === 0) {
            data = ''
        }
        const options = this.getOptions(data, method, url)
        return httpClient.call(options)
    }
}

const client = new Client()
export default client
