import Endpoints, { RequestType } from '../Constants/Endpoints'
import PaymentMethod from '../PaymentMethods/PaymentMethod'
import { ITransaction } from '../Models/ITransaction'
import { IConfig, ICredentials } from '../Utils/Types'
import { SpecificationResponse, SpecificationsResponse } from '../Models/SpecificationResponse'
import { TransactionResponse } from '../Models/TransactionResponse'
import RequestHeaders from './Headers'
import HttpMethods from '../Constants/HttpMethods'
import HttpsClient from "./HttpsClient";

export class Client extends HttpsClient{
    private static _credentials: ICredentials
    private static _config: IConfig
    private constructor() {
        super()
        this.options.host = this.getConfig().mode === 'live' ? Endpoints.LIVE : Endpoints.TEST
        this.options.protocol = 'https:'
    }
    static initialize(credentials: ICredentials, config: IConfig) {

        this._credentials = credentials
        this._config = config

        this._config.currency = config?.currency || 'EUR'
        this._config.mode = config?.mode || 'test'

        return new Client()
    }
    getCredentials = (): ICredentials => {
        return Client._credentials
    }
    getConfig = (): IConfig => {
        return Client._config
    }
    request(data: string = ''): Promise<any> {
        this.headers.setAuthHeader(this.options,data,this.getCredentials())
        return super.request(data);
    }

    transactionRequest(data: ITransaction): Promise<TransactionResponse> {
        this.options.path = this.transactionRequestUrl()
        this.options.method = HttpMethods.METHOD_POST
        return this.request(JSON.stringify(data))
    }
    dataRequest(data: object): Promise<SpecificationsResponse | SpecificationResponse> {
        this.options.path = this.dataRequestUrl()
        this.options.method = HttpMethods.METHOD_GET
        return this.request(JSON.stringify(data))
    }
    private transactionRequestUrl(path:string = ''):string {
        return '/json/Transaction' + path
    }
    private dataRequestUrl(path:string = ''):string {
        return '/json/DataRequest' + path
    }

    status(transactionKey: string) {
        this.options.path = this.transactionRequestUrl(`/Status/${transactionKey}`)

        return this.request()
    }
    cancelInfo(transactionKey: string) {
        this.options.path = this.transactionRequestUrl(`/Cancel/${transactionKey}`)
        return this.request()
    }
    refundInfo(transactionKey: string) {
        return this.transactionRequestUrl(`/RefundInfo/${transactionKey}`)
    }
    invoiceInfo(invoiceKey: string) {
        return this.transactionRequestUrl(`/InvoiceInfo/${invoiceKey}`)

    }
}
