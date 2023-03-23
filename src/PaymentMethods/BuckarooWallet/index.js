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
var Buckaroowallet = /** @class */ (function (_super) {
    __extends(Buckaroowallet, _super);
    function Buckaroowallet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'buckaroowalletcollecting';
        return _this;
    }
    Buckaroowallet.prototype.pay = function (payload) {
        return _super.prototype.pay.call(this, payload);
    };
    Buckaroowallet.prototype.refund = function (payload) {
        return _super.prototype.refund.call(this, payload);
    };
    Buckaroowallet.prototype.deposit = function (payload) {
        this.action = 'Deposit';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Buckaroowallet.prototype.reserve = function (payload) {
        this.action = 'Reserve';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Buckaroowallet.prototype.withdrawal = function (payload) {
        this.action = 'Withdrawal';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Buckaroowallet.prototype.cancel = function (payload) {
        this.action = 'Cancel';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Buckaroowallet.prototype.create = function () {
        this.action = 'Create';
        return this.dataRequest();
    };
    Buckaroowallet.prototype.update = function () {
        this.action = 'Update';
        return this.dataRequest();
    };
    Buckaroowallet.prototype.getInfo = function () {
        this.action = 'Getinfo';
        return this.dataRequest();
    };
    Buckaroowallet.prototype.release = function () {
        this.action = 'Release';
        return this.dataRequest();
    };
    return Buckaroowallet;
}(PayablePaymentMethod_1.PayablePaymentMethod));
var _buckaroowallet;
var buckaroowallet = function () {
    if (!_buckaroowallet)
        _buckaroowallet = new Buckaroowallet();
    return _buckaroowallet;
};
exports.default = buckaroowallet;
//# sourceMappingURL=index.js.map