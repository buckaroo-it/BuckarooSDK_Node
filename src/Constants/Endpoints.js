"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestType = void 0;
var Endpoints;
(function (Endpoints) {
    Endpoints["LIVE"] = "https://checkout.buckaroo.nl/";
    Endpoints["TEST"] = "https://testcheckout.buckaroo.nl/";
})(Endpoints || (Endpoints = {}));
var RequestType;
(function (RequestType) {
    RequestType[RequestType["Data"] = 1] = "Data";
    RequestType[RequestType["Transaction"] = 2] = "Transaction";
})(RequestType || (RequestType = {}));
exports.RequestType = RequestType;
exports.default = Endpoints;
//# sourceMappingURL=Endpoints.js.map