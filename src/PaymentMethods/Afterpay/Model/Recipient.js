"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptPhone = exports.adaptAddress = exports.adaptRecipient = exports.adaptShipping = exports.adaptBilling = void 0;
function adaptBilling(billing) {
    billing.groupType = 'BillingCustomer';
    billing.recipient = (0, exports.adaptRecipient)(billing.recipient);
    billing.address = (0, exports.adaptAddress)(billing.address);
    billing.phone = (0, exports.adaptPhone)(billing.phone);
    return billing;
}
exports.adaptBilling = adaptBilling;
function adaptShipping(shipping) {
    shipping.groupType = 'ShippingCustomer';
    shipping.recipient = (0, exports.adaptRecipient)(shipping.recipient);
    shipping.address = (0, exports.adaptAddress)(shipping.address);
    shipping.phone = (0, exports.adaptPhone)(shipping.phone);
    return shipping;
}
exports.adaptShipping = adaptShipping;
var adaptRecipient = function (recipient) {
    recipient.setParameterKeys({
        title: 'Salutation',
        chamberOfCommerce: 'IdentificationNumber'
    });
    return recipient;
};
exports.adaptRecipient = adaptRecipient;
var adaptAddress = function (address) {
    address.setParameterKeys({
        houseNumber: 'streetNumber',
        houseNumberAdditional: 'streetNumberAdditional',
        zipcode: 'postalCode'
    });
    return address;
};
exports.adaptAddress = adaptAddress;
var adaptPhone = function (phone) {
    if (phone) {
        phone.setParameterKeys({ mobile: 'phone' });
        return phone;
    }
};
exports.adaptPhone = adaptPhone;
//# sourceMappingURL=Recipient.js.map