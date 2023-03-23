"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request_1 = require("../Models/Request");
var BuckarooClient_1 = require("../BuckarooClient");
var ServiceParameter_1 = require("../Utils/ServiceParameter");
var TransactionResponse_1 = require("../Models/TransactionResponse");
var PaymentMethod = /** @class */ (function () {
    function PaymentMethod() {
        this._requiredFields = ['currency', 'pushURL'];
        this._paymentName = '';
        this._serviceVersion = 0;
        this.request = new Request_1.TransactionRequest();
        this._action = '';
        this.serviceParameters = {};
        this.servicesStrategy = function (data) {
            return data;
        };
    }
    Object.defineProperty(PaymentMethod.prototype, "requiredFields", {
        get: function () {
            return this._requiredFields;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PaymentMethod.prototype, "paymentName", {
        get: function () {
            return this._paymentName;
        },
        set: function (value) {
            this._paymentName = value;
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
            this.serviceParameters.action = value;
        },
        enumerable: false,
        configurable: true
    });
    PaymentMethod.prototype.setServiceList = function (serviceList) {
        //Handle service list Parameters
        if (Object.keys(serviceList).length > 0) {
            this.serviceParameters.parameters = ServiceParameter_1.ServiceParameters.toServiceParameterList(this.servicesStrategy(serviceList));
        }
        this.serviceParameters.action = this.action;
        this.serviceParameters.name = this.paymentName;
        this.serviceParameters.version = this.serviceVersion;
        this.request.addServices(this.serviceParameters);
        //Reset service Strategy
        this.servicesStrategy = function (data) { return data; };
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
        for (var _i = 0, _a = this._requiredFields; _i < _a.length; _i++) {
            var requiredField = _a[_i];
            if (!this.request.getData()[requiredField])
                this.request.setDataKey(requiredField, (0, BuckarooClient_1.buckarooClient)().getConfig()[requiredField]);
        }
    };
    PaymentMethod.prototype.transactionRequest = function () {
        return (0, BuckarooClient_1.buckarooClient)().transactionRequest(this.request.getData());
    };
    PaymentMethod.prototype.dataRequest = function () {
        return (0, BuckarooClient_1.buckarooClient)()
            .dataRequest(this.request.getData())
            .then(function (response) {
            return new TransactionResponse_1.TransactionResponse(response);
        });
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
        //Set the Payload
        this.request.setData(this.takeBasicParameters(data));
        //Set required Fields
        this.setRequiredFields();
        //Set Services
        this.setServiceList(data);
        //Set setAdditionalParameters
        this.setAdditionalParameters();
    };
    PaymentMethod.prototype.specification = function (type) {
        return (0, BuckarooClient_1.buckarooClient)().specification(this.paymentName, this.serviceVersion, type);
    };
    PaymentMethod.prototype.takeBasicParameters = function (data) {
        var basicParametersData = {};
        for (var basicParameterDataKey in data) {
            if (this.request.basicParameters[basicParameterDataKey]) {
                basicParametersData[basicParameterDataKey] = data[basicParameterDataKey];
                delete data[basicParameterDataKey];
            }
        }
        return basicParametersData;
    };
    return PaymentMethod;
}());
exports.default = PaymentMethod;
//# sourceMappingURL=PaymentMethod.js.map