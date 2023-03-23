"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pay = void 0;
var ServiceParameter_1 = require("../../../Utils/ServiceParameter");
var Recipient_1 = require("../../Afterpay/Model/Recipient");
var Article_1 = require("./Article");
var Pay = function (data) {
    data = new ServiceParameter_1.ServiceParameters(data);
    if (data.billing)
        data.billing = (0, Recipient_1.adaptBilling)(data.billing);
    if (data.shipping)
        data.shipping = (0, Recipient_1.adaptShipping)(data.shipping || data.billing);
    data.setParameterKeys({
        lastNamePrefix: 'PrefixLastName'
    });
    if (data.articles)
        data.articles = (0, Article_1.TinkaArticle)(data.articles);
    return data;
};
exports.Pay = Pay;
//# sourceMappingURL=Pay.js.map