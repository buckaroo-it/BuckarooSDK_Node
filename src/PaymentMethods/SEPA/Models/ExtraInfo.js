"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtraInfo = void 0;
var Pay_1 = require("./Pay");
var ServiceParameter_1 = require("../../../Utils/ServiceParameter");
var ExtraInfo = function (data) {
    var address = new ServiceParameter_1.ServiceParameters(data.address);
    address.setParameterKeys({
        houseNumberAdditional: 'HouseNumberSuffix'
    });
    return __assign(__assign({}, (0, Pay_1.Pay)(data)), { address: address, mandateReference: data.mandateReference, mandateDate: data.mandateDate, customerName: data.customer.name, customerCode: data.customer.code, customerReferencePartyCode: data.customer.referenceParty.code, customerReferencePartyName: data.customer.referenceParty.name });
};
exports.ExtraInfo = ExtraInfo;
//# sourceMappingURL=ExtraInfo.js.map