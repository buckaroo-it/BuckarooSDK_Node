"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentPlan = void 0;
var ServiceParameter_1 = require("../../../Utils/ServiceParameter");
var paymentPlan = function (data) {
    return new ServiceParameter_1.ServiceParameterList({
        dossierNumber: data.dossierNumber,
        includedInvoiceKey: data.includedInvoiceKey,
        initialAmount: data.initialAmount,
        installmentAmount: data.installmentAmount,
        installmentCount: data.installmentCount,
        interval: data.interval,
        paymentPlanCostAmount: data.paymentPlanCostAmount,
        paymentPlanCostAmountVat: data.paymentPlanCostAmountVat,
        recipientEmail: data.recipientEmail,
        startDate: data.startDate
    });
};
exports.paymentPlan = paymentPlan;
//# sourceMappingURL=PaymentPlan.js.map