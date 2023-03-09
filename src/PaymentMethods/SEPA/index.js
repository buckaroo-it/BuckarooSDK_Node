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
var SEPA = /** @class */ (function (_super) {
    __extends(SEPA, _super);
    function SEPA() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'SepaDirectDebit';
        _this._serviceVersion = 1;
        return _this;
    }
    SEPA.prototype.pay = function (payload) {
        return _super.prototype.pay.call(this, payload);
    };
    SEPA.prototype.refund = function (payload) {
        return _super.prototype.refund.call(this, payload);
    };
    SEPA.prototype.authorize = function (payload) {
        this.action = 'Authorize';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    SEPA.prototype.payrecurring = function (payload) {
        this.action = 'PayRecurring';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    SEPA.prototype.extrainfo = function (payload) {
        this.action = 'extrainfo';
        return this.dataRequest();
    };
    return SEPA;
}(PayablePaymentMethod_1.PayablePaymentMethod));
var _sepa;
var sepa = function () {
    if (!_sepa)
        _sepa = new SEPA();
    return _sepa;
};
exports.default = sepa;
//# sourceMappingURL=index.js.map