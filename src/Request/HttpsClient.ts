import { Agent, RequestOptions } from 'https'
import { HttpResponseConstructor } from '../Models/Response/HttpClientResponse'
import { ReplyHandler } from '../Handlers/Reply/ReplyHandler'
import Buckaroo from '../index'
const https = require('https')
const defaultAgent = new https.Agent({
    keepAlive: true,
    keepAliveMsecs: 10000
})
export default class HttpsClient {
    protected _options: RequestOptions = {}
    constructor(agent?: Agent) {
        this._options.timeout = 10000
        this._options.agent = agent || defaultAgent
        this._options.sessionTimeout = 30000
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
                ...options
            })
            req.on('error', (err) => {
                reject(err)
            })
            req.on('timeout', () => {
                req.destroy()
            })
            req.on('response', (res) => {
                let response: any[] = []
                res.on('data', (chunk) => {
                    response.push(chunk)
                })
                res.on('end', () => {
                    try {
                        let data = Buffer.concat(response).toString()
                        new ReplyHandler(
                            Buckaroo.Client.credentials,
                            data,
                            res.headers['authorization'],
                            url.toString(),
                            options.method
                        ).validate()
                        resolve(new responseClass(res, data) as InstanceType<R>)
                    } catch (e) {
                        try {
                            reject(Buffer.concat(response).toString())
                        } catch (e) {
                            reject(e)
                        }
                        reject(e)
                    }
                })
            })
            if (data) {
                req.write(data)
            }
            req.end()
            return req
        })
    }
}
