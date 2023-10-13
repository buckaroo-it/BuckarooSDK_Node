import { IncomingMessage } from 'http';
import { JsonModel } from '../Model';
import { ReplyHandler } from '../../Handlers/Reply/ReplyHandler';
import { ICredentials } from '../../Utils/Types';

export interface HttpResponseConstructor {
    new (httpResponse: IncomingMessage, data: string): IHttpClientResponse;
}
export interface IHttpClientResponse {
    httpResponse: IncomingMessage;
    data: object;
}

export class HttpClientResponse implements IHttpClientResponse {
    protected readonly _httpResponse: IncomingMessage;
    protected readonly _data: object;
    protected readonly _rawData: string;
    constructor(httpResponse: IncomingMessage, data: string) {
        this._httpResponse = httpResponse;
        this._rawData = data;
        this._data = new JsonModel(JSON.parse(data));
    }
    get httpResponse(): IncomingMessage {
        return this._httpResponse;
    }
    get rawData(): string {
        return this._rawData;
    }
    get data() {
        return this._data;
    }
    validateResponse(credentials: ICredentials) {
        return new ReplyHandler(credentials, this._rawData, this.httpResponse.headers['authorization'], this.httpResponse.url, this.httpResponse.method).validate().isValid();
    }
}
