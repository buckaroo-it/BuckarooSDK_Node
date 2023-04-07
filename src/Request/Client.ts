import Endpoints, { RequestType } from '../Constants/Endpoints'
import PaymentMethod from '../PaymentMethods/PaymentMethod'
import { ITransaction } from '../Models/ITransaction'
import { IConfig, ICredentials } from '../Utils/Types'
import { SpecificationResponse } from '../Models/SpecificationResponse'
import axios, { AxiosInstance } from 'axios'
import { TransactionResponse } from '../Models/TransactionResponse'
import RequestConfig from './Config'
import httpMethods from '../Constants/HttpMethods'
import HttpMethods from '../Constants/HttpMethods'

export class Client {
    private static _credentials: ICredentials
    private static _config: IConfig
    public axios: AxiosInstance
    private request: RequestConfig
    private constructor() {
        this.axios = axios.create()
        this.request = new RequestConfig()
    }
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
    get(url: string) {
        this.request.setAuthHeader(httpMethods.METHOD_GET, url)
        return this.axios.get(url, { ...this.request }).then((response) => {
            if (typeof response.data === 'object') {
                return new TransactionResponse(response, {
                    headers: this.request.headers,
                    url: url,
                    method: httpMethods.METHOD_GET,
                    data: ''
                })
            }
            throw new Error(response.data)
        })
    }
    post(url: string, requestData: object) {
        this.request.setAuthHeader(httpMethods.METHOD_POST, url, requestData)

        return this.axios
            .post(url, requestData, {
                headers: { Authorization: this.request.headers.Authorization }
            })
            .then((response) => {
                if (typeof response.data === 'object') {
                    return new TransactionResponse(response, {
                        headers: this.request.headers,
                        method: HttpMethods.METHOD_POST,
                        url: url,
                        data: requestData
                    })
                }
                throw new Error(response.data)
            })
    }
    transactionRequest(data: ITransaction) {
        return this.post(this.getTransactionUrl(), data)
    }
    dataRequest(data: ITransaction) {
        return this.post(this.getDataRequestUrl(), data)
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
        let data: { Services: { Name: string; Version: string | number }[] } = { Services: [] }

        for (const paymentMethod of paymentMethods) {
            data.Services.push({
                Name: paymentMethod.paymentName,
                Version: paymentMethod.serviceVersion
            })
        }

        const url =
            type === RequestType.Transaction
                ? this.getTransactionUrl('/Specifications')
                : this.getDataRequestUrl('/Specifications')

        return this.axios.post(url, data)
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
