"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pay = void 0;
var Pay = function (data) {
    return {
        customerFirstName: data.costumer.firstName,
        customerLastName: data.costumer.lastName,
        customerEmail: data.email
    };
};
exports.Pay = Pay;
//# sourceMappingURL=Pay.js.map