import Headers, { RequestConfig, RequestHeaders } from './Headers';
import {
    BatchRequestResponse,
    HttpClientResponse,
    HttpResponseConstructor,
    IRequest,
    IService,
    SpecificationRequestResponse,
    TransactionResponse,
} from '../Models';
import { DataRequestData, SpecificationRequestData, TransactionData } from './DataModels';
import Buckaroo from '../index';
import { Endpoints, HttpMethods, RequestTypes } from '../Constants';
import { ICredentials } from '../Utils';
import { Hmac } from './Hmac';

export default class Request<
    HttpResponse extends HttpResponseConstructor = HttpResponseConstructor,
    RequestData extends object | undefined = undefined
> extends Headers {
    protected _path?: string;
    protected _data?: object | object[] | undefined;
    protected _httpMethod: HttpMethods;
    protected _responseHandler?: HttpResponseConstructor;

    constructor(path?: string, method?: HttpMethods, data?: RequestData, responseHandler?: HttpResponse) {
        super();
        this._path = path;
        this._data = data;
        this._httpMethod = method || HttpMethods.GET;
        this._responseHandler = responseHandler;
    }

    get data(): RequestData {
        return this._data as any;
    }

    get httpMethod(): HttpMethods {
        return this._httpMethod;
    }

    get url(): URL {
        return new URL(Endpoints[Buckaroo.Client.config.mode] + (this._path || ''));
    }

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

    static Specification<T extends IService[] | IService>(
        type: RequestTypes.Data | RequestTypes.Transaction,
        data: T
    ): T extends IService[]
        ? Request<typeof SpecificationRequestResponse, SpecificationRequestData>
        : Request<typeof SpecificationRequestResponse, undefined> {
        if (Array.isArray(data)) {
            return new Request(
                type + `/Specifications`,
                HttpMethods.POST,
                new SpecificationRequestData(data),
                SpecificationRequestResponse
            ) as any;
        }
        return new Request(
            type + `/Specification/${data?.name}?serviceVersion=${data?.version}`,
            HttpMethods.GET,
            undefined,
            SpecificationRequestResponse
        ) as any;
    }

    static BatchTransaction(payload: IRequest[] = []) {
        return new Request(
            RequestTypes.BatchTransaction,
            HttpMethods.POST,
            payload.map((data) => new TransactionData(data)),
            BatchRequestResponse
        );
    }

    static BatchDataRequest(data: DataRequestData[] = []) {
        return new Request(RequestTypes.BatchData, HttpMethods.POST, data, BatchRequestResponse);
    }

    request(options: RequestConfig = {}) {
        let data = (this._httpMethod === HttpMethods.GET ? {} : this._data) ?? {};
        this.setAuthorizationHeader(data);
        return Buckaroo.Client.httpClient.sendRequest(
            this.url,
            data,
            {
                method: this._httpMethod,
                headers: this.headers as RequestHeaders,
                ...options,
            },
            this.responseHandler
        );
    }

    protected setAuthorizationHeader(data?: object, credentials: ICredentials = Buckaroo.Client.credentials): this {
        let hmac = new Hmac();
        hmac.data = JSON.stringify(data);
        hmac.method = this.httpMethod;
        hmac.url = this.url.toString();
        this.headers.Authorization = hmac.generate(credentials);
        return this;
    }
}
