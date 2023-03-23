"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditArticle = void 0;
var IArticle_1 = require("../../../Models/Services/IArticle");
var CreditArticle = function (data) {
    return (0, IArticle_1.ArticleService)(data, {
        keys: { identifier: 'ProductId', description: 'ProductName', price: 'PricePerUnit' },
        groupId: true,
        groupType: 'ProductLine'
    });
};
exports.CreditArticle = CreditArticle;
//# sourceMappingURL=Article.js.map