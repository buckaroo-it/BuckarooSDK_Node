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
var Buckaroovoucher = /** @class */ (function (_super) {
    __extends(Buckaroovoucher, _super);
    function Buckaroovoucher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'buckaroovoucher';
        return _this;
    }
    Buckaroovoucher.prototype.pay = function (payload) {
        return _super.prototype.pay.call(this, payload);
    };
    Buckaroovoucher.prototype.refund = function (payload) {
        return _super.prototype.refund.call(this, payload);
    };
    Buckaroovoucher.prototype.getBalance = function (payload) {
        this.action = 'GetBalance';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Buckaroovoucher.prototype.deactivatevoucher = function (payload) {
        this.action = 'DeactivateVoucher';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Buckaroovoucher.prototype.createApplication = function (payload) {
        this.action = 'CreateApplication';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    return Buckaroovoucher;
}(PayablePaymentMethod_1.PayablePaymentMethod));
var _buckaroovoucher;
var buckaroovoucher = function () {
    if (!_buckaroovoucher)
        _buckaroovoucher = new Buckaroovoucher();
    return _buckaroovoucher;
};
exports.default = buckaroovoucher;
//# sourceMappingURL=index.js.map