"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verify = void 0;
var Verify = function (data) {
    return {
        iban: data.bankAccount.iban,
        customeraccountname: data.bankAccount.accountName,
    };
};
exports.Verify = Verify;
//# sourceMappingURL=Verify.js.map