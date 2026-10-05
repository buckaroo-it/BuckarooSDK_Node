import Headers, { RequestConfig } from './Headers';
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

    constructor(
        path?: string,
        method?: HttpMethods,
        data?: RequestData,
        responseHandler?: HttpResponse,
        protected readonly client: Buckaroo = Buckaroo.Client
    ) {
        super();
        Object.defineProperty(this, 'client', { enumerable: false });
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
        return new URL(Endpoints[this.client.config.mode] + (this._path || ''));
    }

    protected get responseHandler(): HttpResponse {
        return (this._responseHandler || HttpClientResponse) as HttpResponse;
    }

    static Transaction(payload?: IRequest, client: Buckaroo = Buckaroo.Client) {
        return new Request(
            RequestTypes.Transaction,
            HttpMethods.POST,
            new TransactionData(payload),
            TransactionResponse,
            client
        );
    }

    static DataRequest(payload?: IRequest, client: Buckaroo = Buckaroo.Client) {
        return new Request(
            RequestTypes.Data,
            HttpMethods.POST,
            new DataRequestData(payload),
            TransactionResponse,
            client
        );
    }

    static Specification<T extends IService[] | IService>(
        type: RequestTypes.Data | RequestTypes.Transaction,
        data: T,
        client: Buckaroo = Buckaroo.Client
    ): T extends IService[]
        ? Request<typeof SpecificationRequestResponse, SpecificationRequestData>
        : Request<typeof SpecificationRequestResponse> {
        if (Array.isArray(data)) {
            return new Request(
                type + `/Specifications`,
                HttpMethods.POST,
                new SpecificationRequestData(data),
                SpecificationRequestResponse,
                client
            ) as any;
        }
        return new Request(
            type + `/Specification/${data?.name}?serviceVersion=${data?.version}`,
            HttpMethods.GET,
            undefined,
            SpecificationRequestResponse,
            client
        ) as any;
    }

    static BatchTransaction(payload: IRequest[] = [], client: Buckaroo = Buckaroo.Client) {
        return new Request(
            RequestTypes.BatchTransaction,
            HttpMethods.POST,
            payload.map((data) => new TransactionData(data)),
            BatchRequestResponse,
            client
        );
    }

    static BatchDataRequest(data: DataRequestData[] = [], client: Buckaroo = Buckaroo.Client) {
        return new Request(RequestTypes.BatchData, HttpMethods.POST, data, BatchRequestResponse, client);
    }

    request(options: RequestConfig = {}) {
        let data = (this._httpMethod === HttpMethods.GET ? {} : this.data) ?? {};
        this.setAuthorizationHeader(data);
        return this.client.httpClient.sendRequest(
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

    protected setAuthorizationHeader(data?: object, credentials: ICredentials = this.client.credentials): this {
        let hmac = new Hmac();
        hmac.data = JSON.stringify(data);
        hmac.method = this.httpMethod;
        hmac.url = this.url.toString();
        this.headers.Authorization = hmac.generate(credentials);
        return this;
    }
}
