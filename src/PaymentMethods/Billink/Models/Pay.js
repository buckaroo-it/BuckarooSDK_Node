"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payServices = void 0;
var Recipient_1 = require("../../Afterpay/Model/Recipient");
var IArticle_1 = require("../../../Models/Services/IArticle");
var ServiceParameter_1 = require("../../../Utils/ServiceParameter");
var payServices = function (data) {
    data = new ServiceParameter_1.ServiceParameters(data);
    if (data.billing)
        data.billing = (0, Recipient_1.adaptBilling)(data.billing);
    if (data.shipping)
        data.shipping = (0, Recipient_1.adaptShipping)(data.shipping || data.billing);
    if (data.articles)
        data.articles = (0, IArticle_1.ArticleService)(data.articles);
    return data;
};
exports.payServices = payServices;
//# sourceMappingURL=Pay.js.map