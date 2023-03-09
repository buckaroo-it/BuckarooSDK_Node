"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
var ServiceParameter_1 = require("../../../Utils/ServiceParameter");
var Services = function (data) {
    return new ServiceParameter_1.ServiceParameterList({
        issuer: data.issuer
    });
};
exports.Services = Services;
//# sourceMappingURL=Pay.js.map