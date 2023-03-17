import {ServiceObject} from "../Models/ServiceObject";
import HttpMethods from "../Constants/HttpMethods";
import headers from "./Headers";

const https = require('https')

type Options = {
    hostname:string,
    path:string,
    method:HttpMethods,
    headers: ReturnType<typeof headers.getHeaders>
    data?:any
}
const httpsCall = (options: Options) => {
    return new Promise<any>(function (resolve, reject) {
        const req = https.request(options, (res) => {
            let body: Uint8Array[] = []
            res.on('data', (chunk: Uint8Array) => {
                body.push(chunk)
            })
            res.on('end', function () {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body)
            })
        })
        req.on('error', (error) => {
            console.log(error)
            reject(error)
        })
        if (options.data) {
            req.write(JSON.stringify(options.data))
        }
        req.end()
    })
}

export default httpsCall
