"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOrUpdateProductLines = void 0;
var ServiceParameter_1 = require("../../../Utils/ServiceParameter");
var AddOrUpdateProductLines = function (data) {
    var services = new ServiceParameter_1.ServiceParameterList({
        invoiceKey: data.invoiceKey,
        articles: data.articles,
    });
    services.list.articles.groupType = 'ProductLine';
    services.list.articles.setKeys({
        identifier: 'ProductId',
        description: 'ProductName',
        price: 'PricePerUnit'
    });
    services.setCountable('articles');
    return services;
};
exports.AddOrUpdateProductLines = AddOrUpdateProductLines;
//# sourceMappingURL=AddOrUpdateProductLines.js.map