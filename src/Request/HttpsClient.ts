import {RequestOptions} from "https";
import httpMethods from "../Constants/HttpMethods";
import Headers, {RequestHeaders} from "./Headers";
import Endpoints from "../Constants/Endpoints";

const https = require('https');

export type HttpsRequestOptions = RequestOptions
    & { method: httpMethods,hostname:string,timeout:number ,headers:RequestHeaders}

export default class HttpsClient {

    private _client = https

    public options:HttpsRequestOptions
    constructor(url:URL) {
        this.options = {
            method: httpMethods.METHOD_GET,
            headers: new Headers().getHeaders(),
            hostname: url.hostname,
            timeout: 10000,
        }
    }
    get client(): any {
        return this._client;
    }
    request(data:object): Promise<any> {

        return new Promise((resolve, reject) => {
            const req = this._client.request(this.options, res => {
                let responseData:Array<any> = [];

                res.on('data', chunk => {
                    responseData.push(chunk);
                });

                res.on('end', () => {
                    try {
                        resolve(JSON.parse(Buffer.concat(responseData).toString()));
                    } catch (e) {
                        reject(e);
                    }
                });
            }).on('error', err => {
                reject(err.message);
            }).on('timeout', () => {
                req.destroy();
                reject(new Error('Request timeout'));
            }).on('close', () => {
                req.destroy();
                reject(new Error('Request closed'));
            })
            if(Object.keys(data).length > 0){
                req.write(JSON.stringify(data));
            }
            req.end();
        });
    }
}
