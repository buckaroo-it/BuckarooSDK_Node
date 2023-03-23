"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiInfoInvoice = void 0;
var multiInfoInvoice = function (data) {
    var _a;
    (_a = data.findParameter('invoices')) === null || _a === void 0 ? void 0 : _a.makeCountable();
    return data;
};
exports.multiInfoInvoice = multiInfoInvoice;
//# sourceMappingURL=multiInfoInvoice.js.map