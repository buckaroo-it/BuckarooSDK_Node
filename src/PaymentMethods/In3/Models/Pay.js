"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pay = void 0;
var ServiceParameter_1 = require("../../../Utils/ServiceParameter");
var Pay = function (data) {
    return {
        customerType: data.customerType,
        invoiceDate: data.invoiceDate,
        email: new ServiceParameter_1.ServiceParameters({ email: data.email }).setGroupType('Email'),
        phone: new ServiceParameter_1.ServiceParameters(data.phone)
            .setGroupType('Phone')
            .setParameterKeys({ mobile: 'Phone' }),
        company: new ServiceParameter_1.ServiceParameters(data.company).setGroupType('Company').setParameterKeys({
            companyName: 'Name'
        }),
        customer: new ServiceParameter_1.ServiceParameters(data.customer).setGroupType('Person'),
        address: new ServiceParameter_1.ServiceParameters(data.address).setGroupType('Address').setParameterKeys({
            houseNumberAdditional: 'HouseNumberSuffix'
        }),
        articles: new ServiceParameter_1.ServiceParameters(data.articles)
            .setGroupType('ProductLine')
            .makeCountable()
            .setParameterKeys({
            identifier: 'Code',
            description: 'Name'
        }),
        subTotals: new ServiceParameter_1.ServiceParameters(data.subTotals)
            .setGroupType('SubtotalLine')
            .makeCountable()
    };
};
exports.Pay = Pay;
//# sourceMappingURL=Pay.js.map