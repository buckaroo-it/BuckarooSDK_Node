"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoice = void 0;
var Article_1 = require("./Article");
var ServiceParameter_1 = require("../../../Utils/ServiceParameter");
var invoice = function (data) {
    if (!(data instanceof ServiceParameter_1.ServiceParameters)) {
        data = new ServiceParameter_1.ServiceParameters(data);
    }
    var articles = data.findParameter('articles');
    if (articles) {
        data.articles = (0, Article_1.CreditArticle)(data.articles);
    }
    data.setMultipleGroupType({
        address: 'Address',
        company: 'Company',
        person: 'Person',
        debtor: 'Debtor',
        phone: 'Phone'
    });
    data.setGroupType('Email', 'email');
    return data;
};
exports.invoice = invoice;
//# sourceMappingURL=Invoice.js.map