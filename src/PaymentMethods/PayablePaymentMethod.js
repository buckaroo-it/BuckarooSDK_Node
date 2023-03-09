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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayablePaymentMethod = void 0;
var PaymentMethod_1 = __importDefault(require("./PaymentMethod"));
var Functions_1 = require("../Utils/Functions");
var PayablePaymentMethod = /** @class */ (function (_super) {
    __extends(PayablePaymentMethod, _super);
    function PayablePaymentMethod() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.requiredFields = [
            'currency',
            'returnURL',
            'returnURLCancel',
            'pushURL',
        ];
        return _this;
    }
    PayablePaymentMethod.prototype.transactionRequest = function (payload) {
        if (payload)
            this.setPayload(payload);
        return _super.prototype.transactionRequest.call(this);
    };
    PayablePaymentMethod.prototype.pay = function (payload) {
        this.action = 'Pay';
        //Call Transaction
        return this.transactionRequest(payload);
    };
    PayablePaymentMethod.prototype.refund = function (payload) {
        this.action = 'Refund';
        //Call Transaction
        return this.transactionRequest(payload);
    };
    PayablePaymentMethod.prototype.setPayload = function (payload) {
        this.request.setDataKey('order', payload.order || (0, Functions_1.uniqid)());
        this.request.setDataKey('invoice', payload.invoice || (0, Functions_1.uniqid)());
        this.setRequest(payload);
    };
    return PayablePaymentMethod;
}(PaymentMethod_1.default));
exports.PayablePaymentMethod = PayablePaymentMethod;
//# sourceMappingURL=PayablePaymentMethod.js.map