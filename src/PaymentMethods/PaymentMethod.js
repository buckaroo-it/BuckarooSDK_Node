"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Request_1 = require("../Models/Request");
var BuckarooClient_1 = require("../BuckarooClient");
var ServiceParameter_1 = require("../Utils/ServiceParameter");
var Model_1 = __importDefault(require("../Models/Model"));
var PaymentMethod = /** @class */ (function () {
    function PaymentMethod() {
        this.requiredFields = ['currency', 'pushURL'];
        this._paymentName = '';
        this._serviceVersion = 0;
        this.request = new Request_1.TransactionRequest();
        this._action = '';
        this.services = function (data) {
            return new ServiceParameter_1.ServiceParameterList(data);
        };
    }
    Object.defineProperty(PaymentMethod.prototype, "paymentName", {
        get: function () {
            return this._paymentName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "serviceVersion", {
        get: function () {
            return this._serviceVersion;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "action", {
        get: function () {
            return this._action;
        },
        set: function (value) {
            this._action = value;
        },
        enumerable: false,
        configurable: true
    });
    PaymentMethod.prototype.setServiceList = function (serviceList) {
        if (!serviceList.isEmpty()) {
            this.request.addServices({
                name: this.paymentName,
                action: this.action,
                version: this.serviceVersion,
                parameters: serviceList.formatServiceParameters()
            });
        }
    };
    PaymentMethod.prototype.setAdditionalParameters = function (additionalParameters) {
        if (additionalParameters) {
            this.request.setDataKey('additionalParameters', {
                additionalParameter: Object.keys(additionalParameters).map(function (key) {
                    var _a;
                    return {
                        name: key,
                        value: (_a = additionalParameters[key]) !== null && _a !== void 0 ? _a : ''
                    };
                })
            });
        }
    };
    PaymentMethod.prototype.setRequiredFields = function () {
        for (var _i = 0, _a = this.requiredFields; _i < _a.length; _i++) {
            var requiredField = _a[_i];
            if (!this.request.getData()[requiredField])
                this.request.setDataKey(requiredField, (0, BuckarooClient_1.buckarooClient)().getConfig()[requiredField]);
        }
    };
    PaymentMethod.prototype.transactionRequest = function () {
        return (0, BuckarooClient_1.buckarooClient)().client().transactionRequest(this.request.getData());
    };
    PaymentMethod.prototype.dataRequest = function () {
        return (0, BuckarooClient_1.buckarooClient)().client().dataRequest(this.request.getData());
    };
    PaymentMethod.prototype.combine = function (method) {
        var _a;
        var data = method['request'].getData().services;
        if (data === null || data === void 0 ? void 0 : data.ServiceList) {
            for (var _i = 0, _b = data.ServiceList; _i < _b.length; _i++) {
                var serviceList = _b[_i];
                if (!((_a = this.request.getData().services) === null || _a === void 0 ? void 0 : _a.ServiceList.includes(serviceList))) {
                    this.request.addServices(serviceList);
                }
            }
        }
        return this;
    };
    PaymentMethod.prototype.setRequest = function (data) {
        var model = new Model_1.default(data);
        //Get Services
        var services = this.services(model.filter(this.request.requestParams()));
        //Set the Payload
        this.request.setData(model.only(this.request.requestParams()));
        //Set required Fields
        this.setRequiredFields();
        //Set Services
        this.setServiceList(services);
        //Set setAdditionalParameters
        this.setAdditionalParameters(data.additionalParameters);
    };
    PaymentMethod.prototype.specification = function (type) {
        return (0, BuckarooClient_1.buckarooClient)().client().specification(this.paymentName, this.serviceVersion, type);
    };
    return PaymentMethod;
}());
exports.default = PaymentMethod;
//# sourceMappingURL=PaymentMethod.js.map