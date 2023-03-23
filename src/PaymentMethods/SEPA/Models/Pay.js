"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pay = void 0;
var Pay = function (data) {
    return {
        customerbic: data.bic,
        customerIBAN: data.iban,
        collectDate: data.collectDate,
        mandateReference: data.mandateReference,
        mandateDate: data.mandateDate,
        customeraccountname: data.customer.name
    };
};
exports.Pay = Pay;
//# sourceMappingURL=Pay.js.map