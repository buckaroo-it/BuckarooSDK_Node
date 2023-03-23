"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOrUpdateProductLines = void 0;
var Article_1 = require("./Article");
var AddOrUpdateProductLines = function (data) {
    data.articles = (0, Article_1.CreditArticle)(data.articles);
    return data;
};
exports.AddOrUpdateProductLines = AddOrUpdateProductLines;
//# sourceMappingURL=AddOrUpdateProductLines.js.map