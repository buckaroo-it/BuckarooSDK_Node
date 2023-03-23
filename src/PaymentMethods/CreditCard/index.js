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
var Creditcard = /** @class */ (function (_super) {
    __extends(Creditcard, _super);
    function Creditcard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Creditcard.prototype.pay = function (payload) {
        return _super.prototype.pay.call(this, payload);
    };
    Creditcard.prototype.refund = function (payload) {
        return _super.prototype.refund.call(this, payload);
    };
    Creditcard.prototype.payEncrypted = function (payload) {
        this.action = 'PayEncrypted';
        return _super.prototype.pay.call(this, payload);
    };
    Creditcard.prototype.payWithSecurityCode = function (payload) {
        this.action = 'PayWithSecurityCode';
        return _super.prototype.pay.call(this, payload);
    };
    Creditcard.prototype.authorize = function (payload) {
        this.action = 'Authorize';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Creditcard.prototype.authorizeWithSecurityCode = function (payload) {
        this.action = 'AuthorizeWithSecurityCode';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Creditcard.prototype.authorizeEncrypted = function (payload) {
        this.action = 'AuthorizeEncrypted';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Creditcard.prototype.cancelAuthorize = function (payload) {
        this.action = 'CancelAuthorize';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Creditcard.prototype.capture = function (payload) {
        this.action = 'Capture';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Creditcard.prototype.payRecurrent = function (payload) {
        this.action = 'PayRecurrent';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Creditcard.prototype.setPayload = function (payload) {
        this.paymentName = payload.name || this._paymentName;
        delete payload.name;
        _super.prototype.setPayload.call(this, payload);
    };
    return Creditcard;
}(PayablePaymentMethod_1.PayablePaymentMethod));
var _creditcard;
var creditcard = function () {
    if (!_creditcard) {
        _creditcard = new Creditcard();
    }
    return _creditcard;
};
exports.default = creditcard;
//# sourceMappingURL=index.js.map