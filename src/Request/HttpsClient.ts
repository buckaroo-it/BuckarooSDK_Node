import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpResponseConstructor } from '../Models/Response/HttpClientResponse';
import { RequestConfig } from './Headers';

export default class HttpsClient {
    protected _options: AxiosRequestConfig = {};
    private _axiosInstance: AxiosInstance;

    constructor() {
        this._options.timeout = 10000;
        this._options.maxRedirects = 10;
        this._options.withCredentials = true;
        this._axiosInstance = axios.create(this._options);
    }

    public async sendRequest<R extends HttpResponseConstructor = HttpResponseConstructor>(
        url: URL,
        data: string,
        options: RequestConfig,
        responseClass: R
    ): Promise<InstanceType<R>> {
        try {
            const response = await this._axiosInstance.request({
                url: url.toString(),
                data,
                ...this._options,
                ...options,
            });

            return new responseClass(response, response.data) as InstanceType<R>;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                throw error.response?.data ?? error;
            }
            throw error;
        }
    }
}
