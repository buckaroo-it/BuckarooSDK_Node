"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinkaArticle = void 0;
var IArticle_1 = require("../../../Models/Services/IArticle");
var TinkaArticle = function (data) {
    return (0, IArticle_1.ArticleService)(data, {
        keys: {
            price: 'UnitGrossPrice'
        }
    });
};
exports.TinkaArticle = TinkaArticle;
//# sourceMappingURL=Article.js.map