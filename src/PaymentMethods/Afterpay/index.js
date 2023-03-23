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
var PayablePaymentMethod_1 = require("../PayablePaymentMethod");
var Services_1 = require("./Model/Services");
var Afterpay = /** @class */ (function (_super) {
    __extends(Afterpay, _super);
    function Afterpay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'afterpay';
        _this._serviceVersion = 1;
        return _this;
    }
    Afterpay.prototype.pay = function (payload) {
        return _super.prototype.pay.call(this, payload);
    };
    Afterpay.prototype.setPayload = function (payload) {
        this.servicesStrategy = Services_1.Pay;
        _super.prototype.setPayload.call(this, payload);
    };
    Afterpay.prototype.authorize = function (payload) {
        this.action = 'Authorize';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Afterpay.prototype.cancelAuthorize = function (payload) {
        this.action = 'CancelAuthorize';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Afterpay.prototype.capture = function (payload) {
        this.action = 'Capture';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Afterpay.prototype.refund = function (payload) {
        return _super.prototype.refund.call(this, payload);
    };
    return Afterpay;
}(PayablePaymentMethod_1.PayablePaymentMethod));
var _afterpay;
var afterpay = function () {
    if (!_afterpay)
        _afterpay = new Afterpay();
    return _afterpay;
};
exports.default = afterpay;
//# sourceMappingURL=index.js.map