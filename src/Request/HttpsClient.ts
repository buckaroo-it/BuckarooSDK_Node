import * as https from 'https';
import { Agent, RequestOptions } from 'https';
import { HttpResponseConstructor } from '../Models/Response/HttpClientResponse';

const defaultAgent = new Agent({
    keepAlive: true,
    keepAliveMsecs: 10000,
});
export default class HttpsClient {
    protected _options: RequestOptions = {};

    constructor(agent?: Agent) {
        this._options.timeout = 10000;
        this._options.agent = agent || defaultAgent;
        this._options.sessionTimeout = 30000;
    }

    public sendRequest<R extends HttpResponseConstructor = HttpResponseConstructor>(
        url: URL,
        data: string,
        options: RequestOptions = {},
        responseClass: R
    ): Promise<InstanceType<R>> {
        return new Promise((resolve, reject) => {
            const req = https.request(url, {
                ...this._options,
                ...options,
            });
            req.on('error', (err) => {
                reject(err);
            });
            req.on('timeout', () => {
                req.destroy();
            });
            req.on('response', (res) => {
                let response: any[] = [];
                res.on('data', (chunk) => {
                    response.push(chunk);
                });
                res.on('end', () => {
                    try {
                        resolve(new responseClass(res, Buffer.concat(response).toString()) as InstanceType<R>);
                    } catch (e) {
                        try {
                            reject(Buffer.concat(response).toString());
                        } catch (e) {
                            reject(e);
                        }
                    }
                });
            });
            if (data) {
                req.write(data);
            }
            req.end();
            return req;
        });
    }
}
