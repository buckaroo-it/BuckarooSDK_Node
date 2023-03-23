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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRequest = exports.Request = void 0;
var Request = /** @class */ (function () {
    function Request() {
        this.data = {};
        this.basicParameters = {
            services: true,
            clientIP: true,
            currency: true,
            returnURL: true,
            returnURLError: true,
            returnURLCancel: true,
            returnURLReject: true,
            pushURL: true,
            pushURLFailure: true,
            invoice: true,
            order: true,
            amountDebit: true,
            amountCredit: true,
            description: true,
            originalTransactionKey: true,
            originalTransactionReference: true,
            culture: true,
            startRecurrent: true,
            continueOnIncomplete: true,
            servicesSelectableByClient: true,
            servicesExcludedForClient: true,
            customParameters: true,
            additionalParameters: true
        };
    }
    Request.prototype.getData = function () {
        return this.data;
    };
    return Request;
}());
exports.Request = Request;
var TransactionRequest = /** @class */ (function (_super) {
    __extends(TransactionRequest, _super);
    function TransactionRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransactionRequest.prototype.setData = function (data) {
        this.data = data;
    };
    TransactionRequest.prototype.setDataKey = function (key, data) {
        this.data[key] = data;
    };
    TransactionRequest.prototype.setServices = function (serviceList) {
        this.data.services = {
            ServiceList: [serviceList]
        };
    };
    TransactionRequest.prototype.addServices = function (serviceList) {
        var _a;
        if ((_a = this.data) === null || _a === void 0 ? void 0 : _a.services) {
            this.data.services.ServiceList.push(serviceList);
        }
        else {
            this.setServices(serviceList);
        }
    };
    return TransactionRequest;
}(Request));
exports.TransactionRequest = TransactionRequest;
//# sourceMappingURL=Request.js.map