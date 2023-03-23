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
var SubscriptionServices_1 = require("./Models/SubscriptionServices");
var PaymentMethod_1 = __importDefault(require("../PaymentMethod"));
var Subscriptions = /** @class */ (function (_super) {
    __extends(Subscriptions, _super);
    function Subscriptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'Subscriptions';
        _this._requiredFields = ['currency'];
        return _this;
    }
    Subscriptions.prototype.create = function (payload) {
        this.action = 'CreateSubscription';
        this.setRequiredFields();
        this.servicesStrategy = SubscriptionServices_1.subscriptionServices;
        this.setServiceList(payload);
        return this.dataRequest();
    };
    Subscriptions.prototype.update = function (payload) {
        this.action = 'UpdateSubscription';
        this.setRequiredFields();
        this.servicesStrategy = SubscriptionServices_1.subscriptionServices;
        this.setServiceList(payload);
        return this.dataRequest();
    };
    Subscriptions.prototype.createCombined = function (payload) {
        this.action = 'CreateCombinedSubscription';
        this.servicesStrategy = SubscriptionServices_1.subscriptionServices;
        this.setServiceList(payload);
        return this;
    };
    Subscriptions.prototype.updateCombined = function (payload) {
        this.action = 'UpdateCombinedSubscription';
        this.request.setDataKey('startRecurrent', true);
        this.servicesStrategy = SubscriptionServices_1.subscriptionServices;
        this.setServiceList(payload);
        return this;
    };
    Subscriptions.prototype.stop = function (payload) {
        this.action = 'StopSubscription';
        this.setRequiredFields();
        this.setServiceList(payload);
        return this.dataRequest();
    };
    Subscriptions.prototype.info = function (payload) {
        this.action = 'SubscriptionInfo';
        this.setRequiredFields();
        this.setServiceList(payload);
        return this.dataRequest();
    };
    Subscriptions.prototype.deletePaymentConfig = function (payload) {
        this.action = 'DeletePaymentConfiguration';
        this.setRequiredFields();
        this.setServiceList(payload);
        return this.dataRequest();
    };
    Subscriptions.prototype.pause = function (payload) {
        this.action = 'PauseSubscription';
        this.setRequiredFields();
        this.setServiceList(payload);
        return this.dataRequest();
    };
    Subscriptions.prototype.resume = function (payload) {
        this.action = 'ResumeSubscription';
        this.setRequiredFields();
        this.setServiceList(payload);
        return this.dataRequest();
    };
    return Subscriptions;
}(PaymentMethod_1.default));
var _subscriptions;
var subscriptions = function () {
    if (!_subscriptions)
        _subscriptions = new Subscriptions();
    return _subscriptions;
};
exports.default = subscriptions;
//# sourceMappingURL=index.js.map