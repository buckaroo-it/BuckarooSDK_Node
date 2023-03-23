declare class TransactionHeaders {
    readonly headers: {
        [key: string]: string;
    };
    private _contentTypeHeader;
    private _dataTypeHeader;
    private _cultureHeader;
    get contentTypeHeader(): string;
    set contentTypeHeader(value: string);
    get cultureHeader(): string;
    set cultureHeader(value: string);
    addHeader(key: string, value: string): void;
    removeHeader(key: string): void;
    getHeaders(): {
        [key: string]: string;
    };
}
declare const headers: TransactionHeaders;
export default headers;
