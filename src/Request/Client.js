"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Endpoints_1 = __importStar(require("../Constants/Endpoints"));
var Hmac_1 = __importDefault(require("./Hmac"));
var HttpMethods_1 = __importDefault(require("../Constants/HttpMethods"));
var HttpClient_1 = __importDefault(require("./HttpClient"));
var BuckarooClient_1 = require("../BuckarooClient");
var PaymentMethod_1 = __importDefault(require("../PaymentMethods/PaymentMethod"));
var Headers_1 = __importDefault(require("./Headers"));
var PaymentMethods_1 = require("../Utils/PaymentMethods");
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client() {
        var _this = _super.call(this) || this;
        _this.getCredentials = function () {
            return Client._credentials;
        };
        _this.getConfig = function () {
            return Client._config;
        };
        return _this;
    }
    Client.initialize = function (credentials, config) {
        if (!config || !credentials)
            throw new Error('Initialize Buckaroo Client with credentials!!');
        this._credentials = credentials;
        this._config = config;
        return new Client();
    };
    Client.prototype.getHeaders = function (method, data, url) {
        Headers_1.default.addHeader('Authorization', (0, Hmac_1.default)(method, url, data));
        return Headers_1.default.getHeaders();
    };
    Client.prototype.getOptions = function (method, url, data) {
        url = new URL(url);
        return {
            hostname: url.host,
            path: url.pathname + url.search,
            method: method,
            headers: this.getHeaders(method, data, url.href),
            data: data
        };
    };
    Client.prototype.getEndpoint = function (path) {
        var _a;
        var baseUrl = ((_a = (0, BuckarooClient_1.buckarooClient)().getConfig()) === null || _a === void 0 ? void 0 : _a.mode) === 'live' ? Endpoints_1.default.LIVE : Endpoints_1.default.TEST;
        return baseUrl + path;
    };
    Client.prototype.getTransactionUrl = function (path) {
        if (path === void 0) { path = ''; }
        return this.getEndpoint('json/Transaction') + path;
    };
    Client.prototype.getDataRequestUrl = function (path) {
        if (path === void 0) { path = ''; }
        return this.getEndpoint('json/DataRequest') + path;
    };
    Client.prototype.getSpecificationUrl = function (paymentName, serviceVersion, type) {
        if (type === void 0) { type = Endpoints_1.RequestType.Transaction; }
        return type === Endpoints_1.RequestType.Transaction
            ? this.getTransactionUrl("/Specification/".concat(paymentName, "?serviceVersion=").concat(serviceVersion))
            : this.getDataRequestUrl("/Specification/".concat(paymentName, "?serviceVersion=").concat(serviceVersion));
    };
    Client.prototype.get = function (url, data) {
        if (data === void 0) { data = ''; }
        var options = this.getOptions(HttpMethods_1.default.METHOD_GET, url, data);
        return (0, HttpClient_1.default)(options);
    };
    Client.prototype.post = function (data, url) {
        var options = this.getOptions(HttpMethods_1.default.METHOD_POST, url, data);
        return (0, HttpClient_1.default)(options);
    };
    Client.prototype.transactionRequest = function (data) {
        var endPoint = this.getTransactionUrl();
        return this.post(data, endPoint);
    };
    Client.prototype.dataRequest = function (data) {
        var endPoint = this.getDataRequestUrl();
        return this.post(data, endPoint);
    };
    Client.prototype.specification = function (paymentName, serviceVersion, type) {
        if (serviceVersion === void 0) { serviceVersion = 0; }
        var endPoint = this.getSpecificationUrl(paymentName, serviceVersion, type);
        return this.get(endPoint);
    };
    Client.prototype.specifications = function (paymentMethods, type) {
        if (type === void 0) { type = Endpoints_1.RequestType.Transaction; }
        var data = { Services: [] };
        for (var _i = 0, paymentMethods_1 = paymentMethods; _i < paymentMethods_1.length; _i++) {
            var paymentMethod = paymentMethods_1[_i];
            if (paymentMethod instanceof PaymentMethod_1.default) {
                data.Services.push({
                    Name: paymentMethod.paymentName,
                    Version: paymentMethod.serviceVersion
                });
            }
            else if (paymentMethod.name && paymentMethod.version) {
                data.Services.push({
                    Name: paymentMethod.name,
                    Version: paymentMethod.version
                });
            }
        }
        var endPoint = type === Endpoints_1.RequestType.Transaction
            ? this.getTransactionUrl('/Specifications')
            : this.getDataRequestUrl('/Specifications');
        return this.post(data, endPoint);
    };
    Client.prototype.status = function (transactionKey) {
        var endPoint = this.getTransactionUrl("/Status/".concat(transactionKey));
        return this.get(endPoint);
    };
    Client.prototype.cancelInfo = function (transactionKey) {
        var endPoint = this.getTransactionUrl("/Cancel/".concat(transactionKey));
        return this.get(endPoint);
    };
    Client.prototype.refundInfo = function (transactionKey) {
        var endPoint = this.getTransactionUrl("/RefundInfo/".concat(transactionKey));
        return this.get(endPoint);
    };
    Client.prototype.invoiceInfo = function (invoiceKey) {
        var endPoint = this.getTransactionUrl("/InvoiceInfo/".concat(invoiceKey));
        return this.get(endPoint);
    };
    return Client;
}(PaymentMethods_1.Methods));
exports.default = Client;
//# sourceMappingURL=Client.js.map