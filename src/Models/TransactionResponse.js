"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionResponse = void 0;
var ResponseStatus_1 = __importDefault(require("../Constants/ResponseStatus"));
var ServiceObject_1 = require("./ServiceObject");
var TransactionResponse = /** @class */ (function (_super) {
    __extends(TransactionResponse, _super);
    function TransactionResponse(data) {
        return _super.call(this, data) || this;
    }
    TransactionResponse.prototype.getStatusCode = function () {
        var _a;
        return (_a = this.findParameter('code')) === null || _a === void 0 ? void 0 : _a.find('code');
    };
    TransactionResponse.prototype.getSubStatusCode = function () {
        var _a;
        return (_a = this.findParameter('subCode')) === null || _a === void 0 ? void 0 : _a.find('code');
    };
    TransactionResponse.prototype.isSuccess = function () {
        return this.getStatusCode() === ResponseStatus_1.default.BUCKAROO_STATUSCODE_SUCCESS;
    };
    TransactionResponse.prototype.isFailed = function () {
        return this.getStatusCode() === ResponseStatus_1.default.BUCKAROO_STATUSCODE_FAILED;
    };
    TransactionResponse.prototype.isCanceled = function () {
        return (this.getStatusCode() === ResponseStatus_1.default.BUCKAROO_STATUSCODE_CANCELLED_BY_USER ||
            this.getStatusCode() === ResponseStatus_1.default.BUCKAROO_STATUSCODE_CANCELLED_BY_MERCHANT);
    };
    TransactionResponse.prototype.isAwaitingConsumer = function () {
        return this.getStatusCode() === ResponseStatus_1.default.BUCKAROO_STATUSCODE_WAITING_ON_CONSUMER;
    };
    TransactionResponse.prototype.isPendingProcessing = function () {
        return this.getStatusCode() === ResponseStatus_1.default.BUCKAROO_STATUSCODE_PENDING_PROCESSING;
    };
    TransactionResponse.prototype.isWaitingOnUserInput = function () {
        return this.getStatusCode() === ResponseStatus_1.default.BUCKAROO_STATUSCODE_WAITING_ON_USER_INPUT;
    };
    TransactionResponse.prototype.isRejected = function () {
        return this.getStatusCode() === ResponseStatus_1.default.BUCKAROO_STATUSCODE_REJECTED;
    };
    TransactionResponse.prototype.isValidationFailure = function () {
        return this.getStatusCode() === ResponseStatus_1.default.BUCKAROO_STATUSCODE_VALIDATION_FAILURE;
    };
    TransactionResponse.prototype.hasRedirect = function () {
        var _a;
        return this.find('redirectURL') && ((_a = this.find('requiredAction')) === null || _a === void 0 ? void 0 : _a.find('name')) === 'Redirect';
    };
    TransactionResponse.prototype.getRedirectUrl = function () {
        return this.hasRedirect() ? this.find('redirectURL') : '';
    };
    TransactionResponse.prototype.getServices = function () {
        return this.find('services');
    };
    TransactionResponse.prototype.getMethod = function () {
        var _a;
        return (_a = this.getServices()) === null || _a === void 0 ? void 0 : _a[0].name;
    };
    TransactionResponse.prototype.getServiceAction = function () {
        var _a;
        return (_a = this.getServices()) === null || _a === void 0 ? void 0 : _a[0].action;
    };
    TransactionResponse.prototype.getServiceParameters = function () {
        var _a;
        var parameters = (_a = this.getServices()) === null || _a === void 0 ? void 0 : _a[0].parameters;
        var data = {};
        if (parameters)
            for (var _i = 0, parameters_1 = parameters; _i < parameters_1.length; _i++) {
                var key = parameters_1[_i];
                data[parameters[key].name] = parameters[parameters[key].value];
            }
        return data;
    };
    TransactionResponse.prototype.getCustomParameters = function () {
        var _a;
        var customParameters = (_a = this.customParameters) === null || _a === void 0 ? void 0 : _a.list;
        if (customParameters) {
            var data = {};
            for (var param in customParameters) {
                data[customParameters[param].name] = customParameters[param].value;
            }
            return data;
        }
        return {};
    };
    TransactionResponse.prototype.getAdditionalParameters = function () {
        var _a;
        var additionalParameters = (_a = this.additionalParameters) === null || _a === void 0 ? void 0 : _a.additionalParameter;
        if (additionalParameters) {
            var data = {};
            for (var param in additionalParameters) {
                data[additionalParameters[param].name] = additionalParameters[param].value;
            }
            return data;
        }
        return {};
    };
    TransactionResponse.prototype.getTransactionKey = function () {
        return this.key;
    };
    TransactionResponse.prototype.getPaymentKey = function () {
        return this.paymentKey;
    };
    TransactionResponse.prototype.hasError = function () {
        return Object.keys(this.findParameter('requestErrors') || {}).length > 0;
    };
    TransactionResponse.prototype.find = function (parameter) {
        return _super.prototype.find.call(this, parameter);
    };
    return TransactionResponse;
}(ServiceObject_1.ServiceObject));
exports.TransactionResponse = TransactionResponse;
//# sourceMappingURL=TransactionResponse.js.map