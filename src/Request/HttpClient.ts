const https = require('https')
class HttpClient {
    async call(options): Promise<any> {
        return await new Promise(function (resolve) {
            const req = https.request(options, (res) => {
                let body = ''
                res.on('data', (chunk) => {
                    process.stdout.write(chunk);
                    try {
                        body = JSON.parse(Buffer.concat([chunk]).toString())
                    } catch (e) {
                        body = Buffer.concat([chunk]).toString()
                    }
                })
                res.on('end', function () {
                    res.data = body
                    resolve(res)
                })
            })
            req.on('error', (error) => {
                console.error(error, 'error')
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
