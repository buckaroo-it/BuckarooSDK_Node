const https = require('https')
class HttpClient {
    call(options):Promise<any> {
        console.log(options)
        return new Promise<any>(function (resolve,reject) {
            const req = https.request(options, (res) => {
                let body:string
                res.on('data', (chunk: Uint8Array) => {
                    try {
                        body = JSON.parse(Buffer.concat([chunk]).toString())
                    } catch (e) {
                        body = Buffer.concat([chunk]).toString()
                    }
                })
                res.on('end', function () {
                    return resolve(body);
                })
            })
            req.on('error', (error) => {
                console.error(error, 'error')
                reject(error)
            })
            if (options.data) {
                console.log(JSON.stringify(options.data))
                req.write(JSON.stringify(options.data))
            }
            req.end()
        })
    }
}
const httpClient = new HttpClient()
export default httpClient
