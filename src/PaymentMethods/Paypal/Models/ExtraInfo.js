"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extraInfo = void 0;
var extraInfo = function (data) {
    return {
        name: data.costumer.name,
        street1: data.address.street,
        street2: data.address.street2,
        cityName: data.address.city,
        stateOrProvince: data.address.state,
        country: data.address.country,
        postalCode: data.address.zipcode,
        noShipping: data.noShipping,
        addressOverride: data.addressOverride,
        phone: data.phone.mobile
    };
};
exports.extraInfo = extraInfo;
//# sourceMappingURL=ExtraInfo.js.map