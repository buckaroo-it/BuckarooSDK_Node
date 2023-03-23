"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pay = void 0;
var ServiceParameter_1 = require("../../../Utils/ServiceParameter");
var Pay = function (data) {
    var costumer = new ServiceParameter_1.ServiceParameters(data.customer);
    costumer.setParameterKeys({
        gender: 'CustomerGender',
        firstName: 'CustomerFirstName',
        lastName: 'CustomerLastName',
        email: 'CustomerEmail'
    });
    return {
        sendMail: data.sendMail,
        dateDue: data.dateDue,
        customerCountry: data.country,
        email: data.email,
        customer: costumer
    };
};
exports.Pay = Pay;
//# sourceMappingURL=Pay.js.map