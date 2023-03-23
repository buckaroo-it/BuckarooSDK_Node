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
var ApplePay = /** @class */ (function (_super) {
    __extends(ApplePay, _super);
    function ApplePay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'applepay';
        _this._serviceVersion = 1;
        return _this;
    }
    ApplePay.prototype.pay = function (payload) {
        return _super.prototype.pay.call(this, payload);
    };
    ApplePay.prototype.refund = function (payload) {
        return _super.prototype.refund.call(this, payload);
    };
    return ApplePay;
}(PayablePaymentMethod_1.PayablePaymentMethod));
var _applepay;
var applepay = function () {
    if (!_applepay)
        _applepay = new ApplePay();
    return _applepay;
};
exports.default = applepay;
//# sourceMappingURL=index.js.map