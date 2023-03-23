import md5 from 'crypto-js/md5'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import Base64 from 'crypto-js/enc-base64'
import { buckarooClient } from '../BuckarooClient'
import HttpMethods from '../Constants/HttpMethods'

const hmacHeader = (method: HttpMethods, url: string = '', data: string | object = '') => {
    let base64Data = data
    let nonce = 'nonce_' + Math.floor(Math.random() * 9999999 + 1)
    let time = String(Math.round(Date.now() / 1000))
    if (url) {
        url = url.replace(/^[^:/.]*[:/]+/i, '')
        url = encodeURIComponent(url).toLowerCase() || ''
    }
    if (base64Data) {
        if (typeof base64Data === 'object') {
            base64Data = JSON.stringify(data)
        }
        base64Data = Base64.stringify(md5(base64Data))
    }
    const hashString =
        buckarooClient().getCredentials().websiteKey + method + url + time + nonce + base64Data

    return (
        `hmac ` +
        `${buckarooClient().getCredentials().websiteKey}:${Base64.stringify(
            hmacSHA256(hashString, buckarooClient().getCredentials().secretKey ?? '')
        )}:${nonce}:${time}`
    )
}

export default hmacHeader
