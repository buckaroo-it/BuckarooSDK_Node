"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
var ServiceParameter_1 = require("../../../Utils/ServiceParameter");
var Services = function (data) {
    var serviceData = new ServiceParameter_1.ServiceParameterList({
        billing: data.billing,
        shipping: data.shipping || data.billing,
        articles: data.articles
    });
    serviceData.setGroupTypes({
        billing: 'BillingCostumer',
        shipping: 'ShippingCustomer',
        articles: 'Article',
    });
    serviceData.list.articles.setKeys({
        price: 'grossUnitPrice'
    });
    serviceData.setCountable('articles');
    return serviceData;
};
exports.Services = Services;
//# sourceMappingURL=Pay.js.map