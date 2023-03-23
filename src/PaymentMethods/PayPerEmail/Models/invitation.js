"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
var services = function (data) {
    return {
        customerGender: data.costumer.gender,
        customerFirstName: data.costumer.firstName,
        customerLastName: data.costumer.lastName,
        merchantSendsEmail: data.merchantSendsEmail,
        customerEmail: data.email,
        expirationDate: data.expirationDate,
        paymentMethodsAllowed: data.paymentMethodsAllowed,
        attachment: data.attachment
    };
};
exports.services = services;
//# sourceMappingURL=invitation.js.map