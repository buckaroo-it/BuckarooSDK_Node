import { IncomingMessage } from 'http'
import { JsonModel } from '../Model'
import { ReplyHandler } from '../../Handlers/Reply/ReplyHandler'
import { ICredentials } from '../../Utils/Types'
import {AxiosResponse} from "axios";

export interface HttpResponseConstructor {
    new (httpResponse: AxiosResponse, data: string): IHttpClientResponse
}
export interface IHttpClientResponse {
    httpResponse: AxiosResponse
}

export class HttpClientResponse implements IHttpClientResponse {
    protected readonly _httpResponse: AxiosResponse
    protected readonly _data: object
    protected readonly _rawData: string
    constructor(httpResponse: AxiosResponse) {
        this._httpResponse = httpResponse
        this._rawData = httpResponse.data
        this._data = new JsonModel(httpResponse.data)
    }
    get httpResponse(): AxiosResponse {
        return this._httpResponse
    }
    get rawData(): string {
        return this._rawData;
    }
    get data() {
        return this._data;
    }
    validateResponse(credentials: ICredentials) {
        return new ReplyHandler(
            credentials,
            this._rawData,
            this.httpResponse.headers['authorization'],
            this.httpResponse.request.url,
            this.httpResponse.request.method
        )
            .validate()
            .isValid()
    }
}
