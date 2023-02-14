import md5 from 'crypto-js/md5'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import Base64 from 'crypto-js/enc-base64'
import api from "../index";
class Hmac {
  private uri: string
  private base64Data: string
  private nonce: string
  private time: string
  private hash: string | undefined

  constructor () {
    this.uri = ''
    this.base64Data = ''
    this.nonce = ''
    this.time = ''
    this.setNonce('nonce_' + Math.floor(Math.random() * 9999999 + 1))
    this.setTime(String(Math.round(Date.now() / 1000)))
  }

  public setUri (uri?: string): this {
    if (uri) {
      uri = uri.replace(/^[^:/.]*[:/]+/i, '')
      this.uri = encodeURIComponent(uri).toLowerCase() || ''
    }
    return this
  }

  public getUri () {
    return this.uri
  }

  public generate (method, data) {
    const hashString =
      api.config.getWebsiteKey() +
      method +
      this.getUri() +
      this.getTime() +
      this.getNonce() +
      this.getBase64Data(data)
    this.hash = Base64.stringify(
      hmacSHA256(hashString, api.config.getSecretKey())
    )
    return `${api.config.getWebsiteKey()}:${
      this.hash
    }:${this.getNonce()}:${this.getTime()}`
  }

  public getBase64Data (data?) {
    if (data) {
      if (typeof data === 'object') {
        data = JSON.stringify(data)
      }
      this.base64Data = Base64.stringify(md5(data))
    }
    return this.base64Data
  }

  public setNonce (nonce?: string) {
    if (nonce) {
      this.nonce = nonce
    }
  }

  public getNonce () {
    return this.nonce
  }

  public setTime (time?: string) {
    if (time) {
      this.time = time
    }
  }

  public getTime () {
    return this.time
  }
}
const hmac = new Hmac()
export default hmac