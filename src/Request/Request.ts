import Headers from './Headers';
import { HttpClientResponse, HttpResponseConstructor } from '../Models/Response/HttpClientResponse';
import { DataRequestData, SpecificationRequestData, TransactionData } from './DataModels';
import Buckaroo from '../index';
import Endpoints, { RequestTypes } from '../Constants/Endpoints';
import { TransactionResponse } from '../Models/Response/TransactionResponse';
import { SpecificationRequestResponse } from '../Models/Response/SpecificationRequestResponse';
import { BatchRequestResponse } from '../Models/Response/BatchRequestResponse';
import HttpMethods from '../Constants/HttpMethods';
import { RequestOptions } from 'https';
import { ICredentials } from '../Utils/Types';
import { Hmac } from './Hmac';
import { IService } from '../Models/IServiceList';
import IRequest from '../Models/IRequest';

export default class Request<
    HttpResponse extends HttpResponseConstructor = HttpResponseConstructor,
    RequestData extends object | undefined = undefined
> extends Headers {
    protected _path?: string;

    constructor(path?: string, method?: HttpMethods, data?: RequestData, responseHandler?: HttpResponse) {
        super();
        this._path = path;
        this._data = data;
        this._httpMethod = method || HttpMethods.GET;
        this._responseHandler = responseHandler;
    }

    protected _data?: object | object[] | undefined;

    get data(): RequestData {
        return this._data as any;
    }

    protected _httpMethod: HttpMethods;

    get httpMethod(): HttpMethods {
        return this._httpMethod;
    }

    get url(): URL {
        return new URL(Endpoints[Buckaroo.Client.config.mode] + (this._path || ''));
    }

    protected _responseHandler?: HttpResponseConstructor;

    protected get responseHandler(): HttpResponse {
        return (this._responseHandler || HttpClientResponse) as HttpResponse;
    }

    static Transaction(payload?: IRequest) {
        return new Request(
            RequestTypes.Transaction,
            HttpMethods.POST,
            new TransactionData(payload),
            TransactionResponse
        );
    }

    static DataRequest(payload?: IRequest) {
        return new Request(RequestTypes.Data, HttpMethods.POST, new DataRequestData(payload), TransactionResponse);
    }

    static Specification(type: RequestTypes.Data | RequestTypes.Transaction, data: IService[] | IService) {
        if (Array.isArray(data)) {
            return new Request(
                type + `/Specifications`,
                HttpMethods.POST,
                new SpecificationRequestData(data),
                SpecificationRequestResponse
            );
        }
        return new Request(
            type + `/Specification/${data?.name}?serviceVersion=${data?.version}`,
            HttpMethods.GET,
            undefined,
            SpecificationRequestResponse
        );
    }

    static BatchTransaction(payload: IRequest[] = []) {
        return new Request(
            RequestTypes.BatchTransaction,
            HttpMethods.POST,
            payload.map((data) => new TransactionData(data)),
            BatchRequestResponse
        );
    }

    static BatchDataRequest(payload: IRequest[] = []) {
        return new Request(
            RequestTypes.BatchData,
            HttpMethods.POST,
            payload.map((data) => new DataRequestData(data)),
            BatchRequestResponse
        );
    }

    request(options: RequestOptions = {}) {
        let data = this._httpMethod === HttpMethods.GET ? '' : JSON.stringify(this._data);
        this.setAuthorizationHeader(data);
        return Buckaroo.Client.httpClient.sendRequest(
            this.url,
            data,
            {
                method: this._httpMethod,
                headers: this.headers,
                ...options,
            },
            this.responseHandler
        );
    }

    protected setAuthorizationHeader(data: string, credentials: ICredentials = Buckaroo.Client.credentials): this {
        let hmac = new Hmac();
        hmac.data = data;
        hmac.method = this.httpMethod;
        hmac.url = this.url.toString();
        this.headers.Authorization = hmac.generate(credentials);
        return this;
    }
}
