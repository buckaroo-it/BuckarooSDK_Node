"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debtorInfo = exports.debtor = void 0;
var Invoice_1 = require("./Invoice");
var debtor = function (data) {
    (0, Invoice_1.invoice)(data);
    data.setGroupType('addressUnreachable', 'Address');
    data.setGroupType('emailUnreachable', 'Email');
    data.setGroupType('mobileUnreachable', 'Phone');
    data.setGroupType('landlineUnreachable', 'Phone');
    data.setGroupType('faxUnreachable', 'Phone');
    return data;
};
exports.debtor = debtor;
var debtorInfo = function (data) {
    data.setGroupType('debtor', 'debtor');
    return data;
};
exports.debtorInfo = debtorInfo;
//# sourceMappingURL=Debtor.js.map