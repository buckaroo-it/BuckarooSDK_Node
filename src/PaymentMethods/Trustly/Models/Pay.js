"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pay = void 0;
var Pay = function (data) {
    return {
        customerCountryCode: data.country,
        customerFirstName: data.customer.firstName,
        customerLastName: data.customer.lastName
    };
};
exports.Pay = Pay;
//# sourceMappingURL=Pay.js.map