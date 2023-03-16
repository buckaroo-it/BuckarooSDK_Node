class TransactionHeaders {
    readonly headers: { [key: string]: string } = {}

    private _contentTypeHeader = 'application/json; charset=utf-8'
    private _dataTypeHeader = 'application/json'
    private _cultureHeader = 'en-GB'

    get contentTypeHeader(): string {
        return this._contentTypeHeader
    }
    set contentTypeHeader(value: string) {
        this._contentTypeHeader = value
    }
    get cultureHeader(): string {
        return this._cultureHeader
    }
    set cultureHeader(value: string) {
        this._cultureHeader = value
    }
    addHeader(key: string, value: string) {
        this.headers[key] = value
    }
    removeHeader(key: string) {
        delete this.headers[key]
    }
    public getHeaders() {
        this.addHeader('Content-Type', this.contentTypeHeader)
        this.addHeader('Accept', this._dataTypeHeader)
        this.addHeader('Culture', this.cultureHeader)
        return this.headers
    }
}
const headers = new TransactionHeaders()
export default headers
