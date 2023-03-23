"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["BUCKAROO_STATUSCODE_SUCCESS"] = "190";
    ResponseStatus["BUCKAROO_STATUSCODE_FAILED"] = "490";
    ResponseStatus["BUCKAROO_STATUSCODE_VALIDATION_FAILURE"] = "491";
    ResponseStatus["BUCKAROO_STATUSCODE_TECHNICAL_ERROR"] = "492";
    ResponseStatus["BUCKAROO_STATUSCODE_REJECTED"] = "690";
    ResponseStatus["BUCKAROO_STATUSCODE_WAITING_ON_USER_INPUT"] = "790";
    ResponseStatus["BUCKAROO_STATUSCODE_PENDING_PROCESSING"] = "791";
    ResponseStatus["BUCKAROO_STATUSCODE_WAITING_ON_CONSUMER"] = "792";
    ResponseStatus["BUCKAROO_STATUSCODE_PAYMENT_ON_HOLD"] = "793";
    ResponseStatus["BUCKAROO_STATUSCODE_CANCELLED_BY_USER"] = "890";
    ResponseStatus["BUCKAROO_STATUSCODE_CANCELLED_BY_MERCHANT"] = "891";
    ResponseStatus["BUCKAROO_AUTHORIZE_TYPE_CANCEL"] = "I014";
    ResponseStatus["BUCKAROO_AUTHORIZE_TYPE_ACCEPT"] = "I013";
    ResponseStatus["BUCKAROO_AUTHORIZE_TYPE_GROUP_TRANSACTION"] = "I150";
})(ResponseStatus || (ResponseStatus = {}));
exports.default = ResponseStatus;
//# sourceMappingURL=ResponseStatus.js.map