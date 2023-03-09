"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiInfoInvoice = void 0;
var ServiceParameter_1 = require("../../../Utils/ServiceParameter");
var multiInfoInvoice = function (data) {
    var invoiceInfos = new ServiceParameter_1.ServiceParameterList({
        invoices: data.invoices
    });
    invoiceInfos.setCountable('invoices');
    return invoiceInfos;
};
exports.multiInfoInvoice = multiInfoInvoice;
//# sourceMappingURL=multiInfoInvoice.js.map