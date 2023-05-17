import {RequestOptions} from "https";
import RequestHeaders from "./Headers";

const https = require('https');

export default class HttpsClient {

    private _client = https
    private _headers:RequestHeaders = new RequestHeaders()
    private _options:RequestOptions = {}


    get client(): any {
        return this._client;
    }

    get headers(): RequestHeaders {
        return this._headers;
    }

    get options():Omit<RequestOptions,'headers'> {
        return this._options;
    }

    request(data:string = ''): Promise<any> {
        this._options.headers = this._headers.getHeaders()

        return new Promise((resolve, reject) => {

            const req = https.request(this._options, res => {

                let responseData:Array<any> = [];
                res.on('data', chunk => {
                    responseData.push(chunk);
                });

                res.on('end', () => {
                    let returnData = ''
                    try {
                        returnData = JSON.parse(Buffer.concat(responseData).toString());
                    } catch (e) {
                        reject(e);
                    }
                    resolve(returnData);
                });
            }).on('error', err => {
                reject(err.message);
            });
            if(data){
                req.write(data);
            }
            req.end();
        });
    }
}
