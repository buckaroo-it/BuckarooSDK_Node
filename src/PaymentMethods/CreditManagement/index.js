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
var Invoice_1 = require("./Models/Invoice");
var Functions_1 = require("../../Utils/Functions");
var Debtor_1 = require("./Models/Debtor");
var multiInfoInvoice_1 = require("./Models/multiInfoInvoice");
var AddOrUpdateProductLines_1 = require("./Models/AddOrUpdateProductLines");
var CreditManagement = /** @class */ (function (_super) {
    __extends(CreditManagement, _super);
    function CreditManagement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'CreditManagement3';
        _this._requiredFields = ['currency'];
        _this._serviceVersion = 1;
        return _this;
    }
    CreditManagement.prototype.createInvoice = function (payload) {
        this.action = 'CreateInvoice';
        payload.invoice = payload.invoice || (0, Functions_1.uniqid)();
        this.servicesStrategy = Invoice_1.invoice;
        this.setRequest(payload);
        return this.dataRequest();
    };
    CreditManagement.prototype.createCombinedInvoice = function (payload) {
        this.action = 'CreateCombinedInvoice';
        payload.invoice = payload.invoice || (0, Functions_1.uniqid)();
        this.servicesStrategy = Invoice_1.invoice;
        this.setServiceList(payload);
        return this;
    };
    CreditManagement.prototype.createCreditNote = function (payload) {
        this.action = 'CreateCreditNote';
        this.setRequest(payload);
        return this.dataRequest();
    };
    CreditManagement.prototype.addOrUpdateDebtor = function (payload) {
        this.action = 'AddOrUpdateDebtor';
        this.servicesStrategy = Debtor_1.debtor;
        this.setRequest(payload);
        return this.dataRequest();
    };
    CreditManagement.prototype.createPaymentPlan = function (payload) {
        this.action = 'CreatePaymentPlan';
        this.setRequest(payload);
        return this.dataRequest();
    };
    CreditManagement.prototype.terminatePaymentPlan = function (payload) {
        this.action = 'TerminatePaymentPlan';
        this.setRequest(payload);
        return this.dataRequest();
    };
    CreditManagement.prototype.pauseInvoice = function (payload) {
        this.action = 'PauseInvoice';
        this.setRequest(payload);
        return this.dataRequest();
    };
    CreditManagement.prototype.unpauseInvoice = function (payload) {
        this.action = 'UnpauseInvoice';
        this.setRequest(payload);
        return this.dataRequest();
    };
    CreditManagement.prototype.invoiceInfo = function (payload) {
        this.action = 'InvoiceInfo';
        this.servicesStrategy = multiInfoInvoice_1.multiInfoInvoice;
        this.setRequest(payload);
        return this.dataRequest();
    };
    CreditManagement.prototype.debtorInfo = function (payload) {
        this.action = 'DebtorInfo';
        this.servicesStrategy = Debtor_1.debtorInfo;
        this.setRequest(payload);
        return this.dataRequest();
    };
    CreditManagement.prototype.addOrUpdateProductLines = function (payload) {
        this.action = 'AddOrUpdateProductLines';
        this.servicesStrategy = AddOrUpdateProductLines_1.AddOrUpdateProductLines;
        this.setRequest(payload);
        return this.dataRequest();
    };
    CreditManagement.prototype.resumeDebtorFile = function (payload) {
        this.action = 'ResumeDebtorFile';
        this.setServiceList(payload);
        return this.dataRequest();
    };
    CreditManagement.prototype.pauseDebtorFile = function (payload) {
        this.action = 'PauseDebtorFile';
        this.setServiceList(payload);
        return this.dataRequest();
    };
    return CreditManagement;
}(PaymentMethod_1.default));
var _creditManagement;
var creditManagement = function () {
    if (!_creditManagement)
        _creditManagement = new CreditManagement();
    return _creditManagement;
};
exports.default = creditManagement;
//# sourceMappingURL=index.js.map