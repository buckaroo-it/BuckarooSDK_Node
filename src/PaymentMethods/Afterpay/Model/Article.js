"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AfterPayArticle = void 0;
var IArticle_1 = require("../../../Models/Services/IArticle");
var AfterPayArticle = function (articles) {
    return (0, IArticle_1.ArticleService)(articles, {
        keys: { price: 'grossUnitPrice' }
    });
};
exports.AfterPayArticle = AfterPayArticle;
//# sourceMappingURL=Article.js.map