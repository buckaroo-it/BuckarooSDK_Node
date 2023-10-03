import Headers from './Headers'
import { HttpClientResponse, HttpResponseConstructor } from '../Models/Response/HttpClientResponse'
import { DataRequestData, SpecificationRequestData, TransactionData } from './DataModels'
import Buckaroo from '../index'
import Endpoints, { RequestTypes } from '../Constants/Endpoints'
import { TransactionResponse } from '../Models/Response/TransactionResponse'
import { SpecificationRequestResponse } from '../Models/Response/SpecificationRequestResponse'
import { BatchRequestResponse } from '../Models/Response/BatchRequestResponse'
import HttpMethods from '../Constants/HttpMethods'
import { RequestOptions } from 'https'
import PaymentMethod from '../PaymentMethods/PaymentMethod'
import { ICredentials } from '../Utils/Types'
import { Hmac } from './Hmac'
import { MethodFromServiceCode, ServiceCode } from '../Utils/MethodTypes'
import { IService } from '../Models/IServiceList'

export default class Request<
    HttpResponse extends HttpResponseConstructor = HttpResponseConstructor,
    RequestData extends object | undefined = undefined
> extends Headers {
    protected _data?: object | object[] | undefined
    protected _httpMethod: HttpMethods
    protected _path?: string
    protected _responseHandler?: HttpResponseConstructor
    constructor(
        path?: string,
        method?: HttpMethods,
        data?: RequestData,
        responseHandler?: HttpResponse
    ) {
        super()
        this._path = path
        this._data = data
        this._httpMethod = method || HttpMethods.GET
        this._responseHandler = responseHandler
    }
    get httpMethod(): HttpMethods {
        return this._httpMethod
    }
    get data(): RequestData {
        return this._data as any
    }
    get url(): URL {
        return new URL(Endpoints[Buckaroo.Client.config.mode] + (this._path || ''))
    }
    protected get responseHandler(): HttpResponse {
        return (this._responseHandler || HttpClientResponse) as HttpResponse
    }
    protected setAuthorizationHeader(
        data: string,
        credentials: ICredentials = Buckaroo.Client.credentials
    ): this {
        let hmac = new Hmac()
        hmac.data = data
        hmac.method = this.httpMethod
        hmac.url = this.url.toString()
        this.headers.Authorization = hmac.generate(credentials)
        return this
    }
    request(options: RequestOptions = {}) {
        let data = this._httpMethod === HttpMethods.GET ? '' : JSON.stringify(this._data)
        this.setAuthorizationHeader(data)
        return Buckaroo.Client.httpClient.sendRequest(
            this.url,
            data,
            {
                method: this._httpMethod,
                headers: this.headers,
                ...options
            },
            this.responseHandler
        )
    }
    static Transaction(data?: TransactionData) {
        return new Request(RequestTypes.Transaction, HttpMethods.POST, data, TransactionResponse)
    }
    static DataRequest(data?: DataRequestData) {
        return new Request(RequestTypes.Data, HttpMethods.POST, data, TransactionResponse)
    }
    static Specification(
        type: RequestTypes.Data | RequestTypes.Transaction,
        data: IService[] | IService
    ) {
        if (Array.isArray(data)) {
            return new Request(
                type + `/Specifications`,
                HttpMethods.POST,
                new SpecificationRequestData(data),
                SpecificationRequestResponse
            )
        }
        return new Request(
            type + `/Specification/${data?.name}?serviceVersion=${data?.version}`,
            HttpMethods.GET,
            undefined,
            SpecificationRequestResponse
        )
    }
    static BatchTransaction(data: TransactionData[] = []) {
        return new Request(
            RequestTypes.BatchTransaction,
            HttpMethods.POST,
            data,
            BatchRequestResponse
        )
    }
    static BatchDataRequest(data: DataRequestData[] = []) {
        return new Request(RequestTypes.BatchData, HttpMethods.POST, data, BatchRequestResponse)
    }
    combine<Method extends ServiceCode | PaymentMethod>(
        method: Method
    ): Method extends ServiceCode ? MethodFromServiceCode<Method> : Method
    combine<R extends Request>(request: R): this
    combine(data): PaymentMethod | this {
        if (!(data instanceof Request)) {
            let paymentMethod: PaymentMethod =
                data instanceof PaymentMethod ? data : Buckaroo.Client.method(data)
            if (this.data instanceof TransactionData) {
                paymentMethod.combine(this.data)
            }
            return paymentMethod
        } else {
            this._data = { ...this._data, ...data.data }
        }
        return this
    }
}
