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
var Pay_1 = require("./Models/Pay");
var In3 = /** @class */ (function (_super) {
    __extends(In3, _super);
    function In3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'capayable';
        return _this;
    }
    In3.prototype.pay = function (payload) {
        this.servicesStrategy = Pay_1.Pay;
        return _super.prototype.pay.call(this, payload);
    };
    In3.prototype.payInInstallments = function (payload) {
        this.action = 'PayInInstallments';
        this.servicesStrategy = Pay_1.Pay;
        return _super.prototype.transactionRequest.call(this, payload);
    };
    In3.prototype.refund = function (payload) {
        return _super.prototype.refund.call(this, payload);
    };
    return In3;
}(PayablePaymentMethod_1.PayablePaymentMethod));
var _in3;
var in3 = function () {
    if (!_in3)
        _in3 = new In3();
    return _in3;
};
exports.default = in3;
//# sourceMappingURL=index.js.map