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
var PaymentMethod_1 = __importDefault(require("../PaymentMethod"));
var invitation_1 = require("./Models/invitation");
var Functions_1 = require("../../Utils/Functions");
var PayPerEmail = /** @class */ (function (_super) {
    __extends(PayPerEmail, _super);
    function PayPerEmail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'payperemail';
        return _this;
    }
    PayPerEmail.prototype.paymentInvitation = function (payload) {
        this.action = 'paymentInvitation';
        payload.invoice = payload.invoice || (0, Functions_1.uniqid)();
        this.servicesStrategy = invitation_1.services;
        this.setRequest(payload);
        return _super.prototype.transactionRequest.call(this);
    };
    return PayPerEmail;
}(PaymentMethod_1.default));
var _payPerEmail;
var payPerEmail = function () {
    if (!_payPerEmail)
        _payPerEmail = new PayPerEmail();
    return _payPerEmail;
};
exports.default = payPerEmail;
//# sourceMappingURL=index.js.map