import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpResponseConstructor } from '../Models';
import { RequestConfig } from './Headers';
import { HttpMethods } from '../Constants';
import { Agent } from 'https';

export default class HttpsClient {
    protected _options: AxiosRequestConfig = {};
    private _axiosInstance: AxiosInstance;

    constructor(agent?: Agent, timeout: number = 10000) {
        this._options.timeout = timeout;
        this._options.maxRedirects = 10;
        this._options.withCredentials = true;

        if (agent) {
            this._options.httpsAgent = agent;
        }

        this._axiosInstance = axios.create(this._options);
    }

    public async sendRequest<R extends HttpResponseConstructor = HttpResponseConstructor>(
        url: URL,
        data: object,
        options: RequestConfig,
        responseClass: R
    ): Promise<InstanceType<R>> {
        try {
            const config = {
                url: url.toString(),
                ...this._options,
                ...options,
            };

            if (options.method !== HttpMethods.GET) {
                config.data = data;
            }

            const response = await this._axiosInstance.request(config);

            return new responseClass(response, response.data) as InstanceType<R>;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                throw error.response?.data ?? error;
            }
            throw error;
        }
    }
}
