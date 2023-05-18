import Endpoints, {RequestTypePaths} from '../Constants/Endpoints'
import {ITransaction} from '../Models/ITransaction'
import {IConfig, ICredentials} from '../Utils/Types'
import {SpecificationResponse, SpecificationsResponse} from '../Models/SpecificationResponse'
import {TransactionResponse} from '../Models/TransactionResponse'
import Headers from './Headers'
import HttpMethods from '../Constants/HttpMethods'
import HttpsClient, {HttpsRequestOptions} from "./HttpsClient";
import {Hmac} from "./Hmac";

export class BuckarooClient {
    private static _credentials: ICredentials
    private static _config: IConfig
    private _httpsClient: HttpsClient;
    private readonly _headers: Headers = new Headers()
    private _hmac :Hmac
    private _requestUrl:URL;

    private constructor() {
        this._requestUrl = new URL(this.modeUrl)
        this._httpsClient = new HttpsClient(this._requestUrl);

        this._hmac = new Hmac(this._httpsClient.options,this._requestUrl);
    }
    get modeUrl(): Endpoints {
        return BuckarooClient._config.mode == 'test' ? Endpoints.TEST : Endpoints.LIVE
    }
    static initialize(credentials: ICredentials, config: IConfig ) {

        this._credentials = credentials
        this._config = {
            mode: 'test',
            currency: 'EUR',
            ...config,
        }
        return new BuckarooClient()
    }
    get requestHeaders(): Headers {
        return this._headers
    }
    get requestOptions(): HttpsRequestOptions {
        return this._httpsClient.options
    }
    getCredentials = (): ICredentials => {
        return BuckarooClient._credentials
    }
    getConfig = (): IConfig => {
        return BuckarooClient._config
    }
    private transactionRequestUrl(path:string = ''):string {
        return RequestTypePaths.Transaction + path
    }
    private dataRequestUrl(path:string = ''):string {
        return RequestTypePaths.Data + path
    }

    request(method,path,data: object = {}): Promise<any> {
        this.requestOptions.method = method
        this.requestOptions.path = path

        this.requestHeaders.setAuthHeader(this._hmac.createHmacHeader(this.getCredentials()))
        return this._httpsClient.request(data)
    }

    transactionRequest(data: ITransaction): Promise<TransactionResponse> {
        return this.request(HttpMethods.METHOD_POST,this.transactionRequestUrl(),data)
    }
    dataRequest(data: object): Promise<SpecificationsResponse | SpecificationResponse> {
        return this.request(HttpMethods.METHOD_GET,this.dataRequestUrl(),data)
    }
    status(transactionKey: string) {
        return this.request(HttpMethods.METHOD_GET,this.transactionRequestUrl(`/Status/${transactionKey}`))
    }
    cancelInfo(transactionKey: string) {
        return this.request(HttpMethods.METHOD_GET,this.transactionRequestUrl(`/Cancel/${transactionKey}`))
    }
    refundInfo(transactionKey: string) {
        return this.request(HttpMethods.METHOD_GET,this.transactionRequestUrl(`/RefundInfo/${transactionKey}`))
    }
    invoiceInfo(invoiceKey: string) {
        return this.request(HttpMethods.METHOD_GET,this.transactionRequestUrl(`/InvoiceInfo/${invoiceKey}`))
    }
}
