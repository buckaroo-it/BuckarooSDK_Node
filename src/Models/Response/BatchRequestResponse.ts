import { HttpClientResponse } from './HttpClientResponse';

export class BatchRequestResponse extends HttpClientResponse {
    get data(): BatchResponseData {
        return this._data as any;
    }
}
export interface BatchResponseData {
    message: string;
    errors?: {
        reference: string;
        message: string;
    }[];
}
