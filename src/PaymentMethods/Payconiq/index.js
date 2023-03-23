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
var Payconiq = /** @class */ (function (_super) {
    __extends(Payconiq, _super);
    function Payconiq() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'payconiq';
        return _this;
    }
    Payconiq.prototype.pay = function (payload) {
        return _super.prototype.pay.call(this, payload);
    };
    Payconiq.prototype.refund = function (payload) {
        return _super.prototype.refund.call(this, payload);
    };
    return Payconiq;
}(PayablePaymentMethod_1.PayablePaymentMethod));
var _payconiq;
var payconiq = function () {
    if (!_payconiq)
        _payconiq = new Payconiq();
    return _payconiq;
};
exports.default = payconiq;
//# sourceMappingURL=index.js.map