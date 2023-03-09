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
var CreditNote_1 = require("./Models/CreditNote");
var Functions_1 = require("../../Utils/Functions");
var Debtor_1 = require("./Models/Debtor");
var PaymentPlan_1 = require("./Models/PaymentPlan");
var multiInfoInvoice_1 = require("./Models/multiInfoInvoice");
var ServiceParameter_1 = require("../../Utils/ServiceParameter");
var AddOrUpdateProductLines_1 = require("./Models/AddOrUpdateProductLines");
var CreditManagement = /** @class */ (function (_super) {
    __extends(CreditManagement, _super);
    function CreditManagement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'CreditManagement3';
        _this.requiredFields = ['currency'];
        _this._serviceVersion = 1;
        return _this;
    }
    CreditManagement.prototype.createInvoice = function (payload) {
        this.action = 'CreateInvoice';
        this.services = Invoice_1.invoice;
        payload.invoice = payload.invoice || (0, Functions_1.uniqid)();
        this.setRequest(payload);
        return this.dataRequest();
    };
    CreditManagement.prototype.createCombinedInvoice = function (payload) {
        this.action = 'CreateCombinedInvoice';
        this.services = Invoice_1.invoice;
        payload.invoice = payload.invoice || (0, Functions_1.uniqid)();
        this.setServiceList(this.services(payload));
        return this;
    };
    CreditManagement.prototype.createCreditNote = function (payload) {
        this.action = 'CreateCreditNote';
        this.services = CreditNote_1.creditNote;
        this.setRequest(payload);
        return this.dataRequest();
    };
    CreditManagement.prototype.addOrUpdateDebtor = function (payload) {
        this.action = 'AddOrUpdateDebtor';
        this.services = Debtor_1.debtor;
        this.setRequest(payload);
        return this.dataRequest();
    };
    CreditManagement.prototype.createPaymentPlan = function (payload) {
        this.action = 'CreatePaymentPlan';
        this.services = PaymentPlan_1.paymentPlan;
        this.setRequest(payload);
        return this.dataRequest();
    };
    CreditManagement.prototype.terminatePaymentPlan = function (payload) {
        this.action = 'TerminatePaymentPlan';
        this.services = PaymentPlan_1.paymentPlan;
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
        this.services = multiInfoInvoice_1.multiInfoInvoice;
        this.setRequest(payload);
        return this.dataRequest();
    };
    CreditManagement.prototype.debtorInfo = function (payload) {
        this.action = 'DebtorInfo';
        this.services = function (data) {
            var serviceData = new ServiceParameter_1.ServiceParameterList(data);
            serviceData.setGroupTypes({
                debtor: 'Debtor'
            });
            return serviceData;
        };
        this.setRequest(payload);
        return this.dataRequest();
    };
    CreditManagement.prototype.addOrUpdateProductLines = function (payload) {
        this.action = 'AddOrUpdateProductLines';
        this.services = AddOrUpdateProductLines_1.AddOrUpdateProductLines;
        this.setRequest(payload);
        return this.dataRequest();
    };
    CreditManagement.prototype.resumeDebtorFile = function (payload) {
        this.action = 'ResumeDebtorFile';
        this.setServiceList(this.services(payload));
        return this.dataRequest();
    };
    CreditManagement.prototype.pauseDebtorFile = function (payload) {
        this.action = 'PauseDebtorFile';
        this.setServiceList(this.services(payload));
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