import Endpoints, { RequestType } from '../Constants/Endpoints'
import PaymentMethod from '../PaymentMethods/PaymentMethod'
import { ITransaction } from '../Models/ITransaction'
import { IConfig, ICredentials } from '../Utils/Types'
import { SpecificationResponse, SpecificationsResponse } from '../Models/SpecificationResponse'
import axios, { AxiosInstance } from 'axios'
import { TransactionResponse } from '../Models/TransactionResponse'
import RequestHeaders from './Headers'
import HttpMethods from '../Constants/HttpMethods'
import httpMethods from '../Constants/HttpMethods'

export class Client {
    private static _credentials: ICredentials
    private static _config: IConfig
    public axios: AxiosInstance = axios.create()
    private headers: RequestHeaders = new RequestHeaders()
    private constructor() {}
    static initialize(credentials?: ICredentials, config?: IConfig) {
        if (!credentials || !credentials.websiteKey || !credentials.secretKey)
            throw new Error('Initialize Buckaroo Client with credentials!!')

        this._credentials = {
            secretKey: credentials.secretKey,
            websiteKey: credentials.websiteKey
        }

        this._config = {
            mode: config?.mode || 'test',
            currency: config?.currency || 'EUR',
            returnURL: config?.returnURL || '',
            returnURLCancel: config?.returnURLCancel || '',
            pushURL: config?.pushURL || '',
            baseUrl: config?.baseUrl || ''
        }
        return new Client()
    }
    getCredentials = (): ICredentials => {
        return Client._credentials
    }
    getConfig = (): IConfig => {
        return Client._config
    }
    private getEndpoint(path: string) {
        const baseUrl = this.getConfig().mode === 'live' ? Endpoints.LIVE : Endpoints.TEST
        return baseUrl + path
    }

    private getTransactionUrl(path: string = ''): string {
        return this.getEndpoint('json/Transaction') + path
    }

    private getDataRequestUrl(path: string = ''): string {
        return this.getEndpoint('json/DataRequest') + path
    }

    protected getSpecificationUrl(
        paymentName: string,
        serviceVersion: number,
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
    call(config: { method: httpMethods; url: string; data?: object }) {
        this.headers.setAuthHeader(config.method, config.url, config.data)

        return this.axios.request({ ...config, headers: this.headers.headers })
    }
    post(url: string, data: object) {
        return this.call({
            method: HttpMethods.POST,
            url,
            data: data
        })
    }
    get(url: string) {
        return this.call({
            method: HttpMethods.GET,
            url
        })
    }

    transactionRequest(data: ITransaction) {
        data.pushURL = data.pushURL || this.getConfig().pushURL

        return this.post(this.getTransactionUrl(), data).then((res) => {
            return new TransactionResponse(res)
        })
    }
    dataRequest(data: ITransaction) {
        return this.post(this.getDataRequestUrl(), data).then((res) => {
            return new TransactionResponse(res)
        })
    }
    specification(paymentName: string, serviceVersion = 0, type?: RequestType) {
        const url = this.getSpecificationUrl(paymentName, serviceVersion, type)
        return this.get(url).then((response) => {
            return new SpecificationResponse(response.data)
        })
    }
    specifications(
        paymentMethods: PaymentMethod[] | { paymentName: string; serviceVersion: number }[],
        type: RequestType = RequestType.Transaction
    ) {
        let data = {
            Services: paymentMethods.map((paymentMethod) => {
                return {
                    Name: paymentMethod.paymentName,
                    Version: paymentMethod.serviceVersion
                }
            })
        }

        const url =
            type === RequestType.Transaction
                ? this.getTransactionUrl('/Specifications')
                : this.getDataRequestUrl('/Specifications')

        return this.call({
            method: HttpMethods.POST,
            url,
            data
        }).then((response) => {
            return new SpecificationsResponse(response.data)
        })
    }
    status(transactionKey: string) {
        const url = this.getTransactionUrl(`/Status/${transactionKey}`)
        return this.get(url)
    }
    cancelInfo(transactionKey: string) {
        const url = this.getTransactionUrl(`/Cancel/${transactionKey}`)
        return this.get(url)
    }
    refundInfo(transactionKey: string) {
        const url = this.getTransactionUrl(`/RefundInfo/${transactionKey}`)
        return this.get(url)
    }
    invoiceInfo(invoiceKey: string) {
        const url = this.getTransactionUrl(`/InvoiceInfo/${invoiceKey}`)
        return this.get(url)
    }
}
