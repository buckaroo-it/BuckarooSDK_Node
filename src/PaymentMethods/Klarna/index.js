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
var Klarna = /** @class */ (function (_super) {
    __extends(Klarna, _super);
    function Klarna() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'klarna';
        _this._serviceVersion = 1;
        _this.requiredFields = ['currency', 'pushURL'];
        return _this;
    }
    Klarna.prototype.pay = function (payload) {
        return _super.prototype.pay.call(this, payload);
    };
    Klarna.prototype.setPayload = function (payload) {
        this.services = function (payload) { return (0, Pay_1.Services)(payload); };
        _super.prototype.setPayload.call(this, payload);
    };
    Klarna.prototype.refund = function (payload) {
        return _super.prototype.refund.call(this, payload);
    };
    Klarna.prototype.payInInstallments = function (payload) {
        this.action = 'PayInInstallments';
        return _super.prototype.transactionRequest.call(this, payload);
    };
    return Klarna;
}(PayablePaymentMethod_1.PayablePaymentMethod));
var _klarna;
var klarna = function () {
    if (!_klarna)
        _klarna = new Klarna();
    return _klarna;
};
exports.default = klarna;
//# sourceMappingURL=index.js.map