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
var KBC = /** @class */ (function (_super) {
    __extends(KBC, _super);
    function KBC() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'kbcpaymentbutton';
        _this._serviceVersion = 1;
        return _this;
    }
    KBC.prototype.pay = function (payload) {
        return _super.prototype.pay.call(this, payload);
    };
    KBC.prototype.refund = function (payload) {
        return _super.prototype.refund.call(this, payload);
    };
    return KBC;
}(PayablePaymentMethod_1.PayablePaymentMethod));
var _kbc;
var kbc = function () {
    if (!_kbc)
        _kbc = new KBC();
    return _kbc;
};
exports.default = kbc;
//# sourceMappingURL=index.js.map