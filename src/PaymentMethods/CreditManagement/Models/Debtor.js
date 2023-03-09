"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debtor = void 0;
var Invoice_1 = require("./Invoice");
var ServiceParameter_1 = require("../../../Utils/ServiceParameter");
var debtor = function (data) {
    var serviceData = new ServiceParameter_1.ServiceParameterList({
        addressUnreachable: data.addressUnreachable,
        emailUnreachable: data.emailUnreachable,
        mobileUnreachable: data.mobileUnreachable,
        landlineUnreachable: data.landlineUnreachable,
        faxUnreachable: data.faxUnreachable
    });
    serviceData.setGroupTypes({
        addressUnreachable: 'Address',
        emailUnreachable: 'Email',
        mobileUnreachable: 'Phone',
        landlineUnreachable: 'Phone',
        faxUnreachable: 'Phone',
    });
    return Object.assign(serviceData, (0, Invoice_1.invoice)(data));
};
exports.debtor = debtor;
//# sourceMappingURL=Debtor.js.map