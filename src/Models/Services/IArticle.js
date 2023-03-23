"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
var ServiceParameter_1 = require("../../Utils/ServiceParameter");
function ArticleService(articlesData, adapters) {
    var articles = new ServiceParameter_1.ServiceParameters(articlesData);
    articles.makeCountable();
    articles.setGroupType((adapters === null || adapters === void 0 ? void 0 : adapters.groupType) || 'Article');
    if (adapters === null || adapters === void 0 ? void 0 : adapters.keys)
        articles.setParameterKeys(adapters.keys);
    return articles;
}
exports.ArticleService = ArticleService;
//# sourceMappingURL=IArticle.js.map