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
var Billink = /** @class */ (function (_super) {
    __extends(Billink, _super);
    function Billink() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'Billink';
        return _this;
    }
    Billink.prototype.pay = function (payload) {
        return _super.prototype.pay.call(this, payload);
    };
    Billink.prototype.refund = function (payload) {
        return _super.prototype.refund.call(this, payload);
    };
    Billink.prototype.authorize = function (payload) {
        this.action = 'Authorize';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Billink.prototype.cancelAuthorize = function (payload) {
        this.action = 'CancelAuthorize';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    Billink.prototype.capture = function (payload) {
        this.action = 'Capture';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    return Billink;
}(PayablePaymentMethod_1.PayablePaymentMethod));
var _billink;
var billink = function () {
    if (!_billink)
        _billink = new Billink();
    return _billink;
};
exports.default = billink;
//# sourceMappingURL=index.js.map