"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creditNote = void 0;
var ServiceParameter_1 = require("../../../Utils/ServiceParameter");
var creditNote = function (data) {
    return new ServiceParameter_1.ServiceParameterList({
        originalInvoiceNumber: data.originalInvoiceNumber,
        invoiceDate: data.invoiceDate,
        invoiceAmount: data.invoiceAmount,
        invoiceAmountVAT: data.invoiceAmountVAT,
        sendCreditNoteMessage: data.sendCreditNoteMessage
    });
};
exports.creditNote = creditNote;
//# sourceMappingURL=CreditNote.js.map