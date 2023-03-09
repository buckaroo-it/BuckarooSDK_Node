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
var Bancontact = /** @class */ (function (_super) {
    __extends(Bancontact, _super);
    function Bancontact() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'bancontactmrcash';
        return _this;
    }
    Bancontact.prototype.pay = function (payload) {
        return _super.prototype.pay.call(this, payload);
    };
    Bancontact.prototype.refund = function (payload) {
        return _super.prototype.refund.call(this, payload);
    };
    Bancontact.prototype.authenticate = function (payload) {
        this.action = 'Authenticate';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Bancontact.prototype.payOneClick = function (payload) {
        this.action = 'PayOneClick';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Bancontact.prototype.payEncrypted = function (payload) {
        this.action = 'PayEncrypted';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Bancontact.prototype.completedPayment = function () {
        this.action = 'CompletedPayment';
        return this.dataRequest();
    };
    Bancontact.prototype.payRecurring = function () {
        this.action = 'PayRecurring';
        return _super.prototype.transactionRequest.call(this);
    };
    return Bancontact;
}(PayablePaymentMethod_1.PayablePaymentMethod));
var _bancontact;
var bancontact = function () {
    if (!_bancontact)
        _bancontact = new Bancontact();
    return _bancontact;
};
exports.default = bancontact;
//# sourceMappingURL=index.js.map