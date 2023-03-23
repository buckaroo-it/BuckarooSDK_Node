"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransactionHeaders = /** @class */ (function () {
    function TransactionHeaders() {
        this.headers = {};
        this._contentTypeHeader = 'application/json; charset=utf-8';
        this._dataTypeHeader = 'application/json';
        this._cultureHeader = 'en-GB';
    }
    Object.defineProperty(TransactionHeaders.prototype, "contentTypeHeader", {
        get: function () {
            return this._contentTypeHeader;
        },
        set: function (value) {
            this._contentTypeHeader = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TransactionHeaders.prototype, "cultureHeader", {
        get: function () {
            return this._cultureHeader;
        },
        set: function (value) {
            this._cultureHeader = value;
        },
        enumerable: false,
        configurable: true
    });
    TransactionHeaders.prototype.addHeader = function (key, value) {
        this.headers[key] = value;
    };
    TransactionHeaders.prototype.removeHeader = function (key) {
        delete this.headers[key];
    };
    TransactionHeaders.prototype.getHeaders = function () {
        this.addHeader('Content-Type', this.contentTypeHeader);
        this.addHeader('Accept', this._dataTypeHeader);
        this.addHeader('Culture', this.cultureHeader);
        return this.headers;
    };
    return TransactionHeaders;
}());
var headers = new TransactionHeaders();
exports.default = headers;
//# sourceMappingURL=Headers.js.map