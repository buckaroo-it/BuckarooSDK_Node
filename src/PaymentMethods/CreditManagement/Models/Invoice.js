"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoice = void 0;
var ServiceParameter_1 = require("../../../Utils/ServiceParameter");
var invoice = function (data) {
    var services = new ServiceParameter_1.ServiceParameterList({
        invoiceAmount: data.invoiceAmount,
        invoiceDate: data.invoiceDate,
        dueDate: data.dueDate,
        code: data.code,
        address: data.address,
        allowedServices: data.allowedServices,
        allowedServicesAfterDueDate: data.allowedServicesAfterDueDate,
        applyStartRecurrent: data.applyStartRecurrent,
        articles: data.articles,
        company: data.company,
        disallowedServices: data.disallowedServices,
        disallowedServicesAfterDueDate: data.disallowedServicesAfterDueDate,
        invoiceAmountVAT: data.invoiceAmountVAT,
        maxStepIndex: data.maxStepIndex,
        person: data.person,
        poNumber: data.poNumber,
        debtor: data.debtor,
        email: data.email,
        phone: data.phone,
        invoiceNumber: data.invoiceNumber,
        schemeKey: data.schemeKey
    });
    services.setGroupTypes({
        articles: 'ProductLine',
        address: 'Address',
        company: 'Company',
        person: 'Person',
        debtor: 'Debtor',
        email: 'Email',
        phone: 'Phone'
    });
    if (services.list.articles) {
        services.list.articles.setKeys({
            identifier: 'ProductId',
            description: 'ProductName',
            price: 'PricePerUnit'
        });
        services.setCountable('articles');
    }
    return services;
};
exports.invoice = invoice;
//# sourceMappingURL=Invoice.js.map