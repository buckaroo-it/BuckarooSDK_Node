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
Object.defineProperty(exports, "__esModule", { value: true });
var PayablePaymentMethod_1 = require("../PayablePaymentMethod");
var ServiceObject_1 = require("../../Models/ServiceObject");
var Ideal = /** @class */ (function (_super) {
    __extends(Ideal, _super);
    function Ideal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'ideal';
        _this._serviceVersion = 2;
        _this._requiredFields = [
            'currency',
            'returnURL',
            'returnURLCancel',
            'pushURL'
        ];
        return _this;
    }
    Ideal.prototype.pay = function (payload) {
        return _super.prototype.pay.call(this, payload);
    };
    Ideal.prototype.refund = function (payload) {
        return _super.prototype.refund.call(this, payload);
    };
    Ideal.prototype.setPayload = function (payload) {
        _super.prototype.setPayload.call(this, payload);
    };
    Ideal.prototype.issuers = function () {
        return this.specification().then(function (response) {
            var issuerList = [];
            response = new ServiceObject_1.ServiceObject(response);
            var parameters = response.findParameter('listItemDescriptions');
            if (parameters) {
                var issuer = void 0;
                for (var _i = 0, _a = Object.values(parameters); _i < _a.length; _i++) {
                    issuer = _a[_i];
                    issuerList.push({
                        id: issuer.value,
                        name: issuer.description
                    });
                }
            }
            return issuerList;
        });
    };
    return Ideal;
}(PayablePaymentMethod_1.PayablePaymentMethod));
var _ideal;
var ideal = function () {
    if (!_ideal)
        _ideal = new Ideal();
    return _ideal;
};
exports.default = ideal;
//# sourceMappingURL=index.js.map