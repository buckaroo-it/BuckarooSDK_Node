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
var Surepay = /** @class */ (function (_super) {
    __extends(Surepay, _super);
    function Surepay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'surepay';
        return _this;
    }
    Surepay.prototype.verify = function (payload) {
        this.action = 'verify';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    return Surepay;
}(PayablePaymentMethod_1.PayablePaymentMethod));
var _surepay;
var surepay = function () {
    if (!_surepay)
        _surepay = new Surepay();
    return _surepay;
};
exports.default = surepay;
//# sourceMappingURL=index.js.map