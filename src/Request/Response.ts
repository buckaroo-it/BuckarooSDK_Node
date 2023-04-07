import {
    AxiosResponse,
    AxiosResponseHeaders,
    InternalAxiosRequestConfig,
    RawAxiosResponseHeaders
} from 'axios'
import { Hmac } from './Hmac'
import RequestConfig from './Config'

export class Response implements AxiosResponse {
    data: undefined | object
    config: InternalAxiosRequestConfig
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders
    status: number
    statusText: string
    private requestData?: RequestConfig
    constructor(response: AxiosResponse, request) {
        this.status = response.status
        this.config = response.config
        this.statusText = response.statusText
        this.headers = response.headers
        this.requestData = request
    }
    validate(request: RequestConfig = this.requestData || new RequestConfig()) {
        let authorization = request.headers.Authorization

        if (typeof authorization === 'string' && request.method) {
            authorization = authorization.split(':')
            let hmac = new Hmac(
                request.method,
                request.url,
                request.data,
                authorization[2],
                authorization[3]
            )
            let hash = hmac.hashData(hmac.getHashString())
            return hash === authorization[1]
        }
    }
}
