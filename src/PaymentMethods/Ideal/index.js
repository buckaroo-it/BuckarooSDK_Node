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
var Pay_1 = require("./Models/Pay");
var PayablePaymentMethod_1 = require("../PayablePaymentMethod");
var Ideal = /** @class */ (function (_super) {
    __extends(Ideal, _super);
    function Ideal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'ideal';
        _this._serviceVersion = 2;
        _this.requiredFields = [
            'currency',
            'returnURL',
            'returnURLCancel',
            'pushURL'
        ];
        _this.services = Pay_1.Services;
        return _this;
    }
    Ideal.prototype.setPayload = function (payload) {
        _super.prototype.setPayload.call(this, payload);
    };
    Ideal.prototype.pay = function (payload) {
        return _super.prototype.pay.call(this, payload);
    };
    Ideal.prototype.refund = function (payload) {
        return _super.prototype.refund.call(this, payload);
    };
    Ideal.prototype.issuers = function () {
        return this.specification().then(function (response) {
            var _a, _b, _c, _d;
            var issuerList = [];
            if ((_d = (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.Actions) === null || _a === void 0 ? void 0 : _a['0']) === null || _b === void 0 ? void 0 : _b.RequestParameters) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.ListItemDescriptions) {
                var issuersData = response.Actions['0'].RequestParameters[0].ListItemDescriptions;
                if (issuersData.length > 0) {
                    for (var _i = 0, issuersData_1 = issuersData; _i < issuersData_1.length; _i++) {
                        var issuer = issuersData_1[_i];
                        issuerList.push({
                            id: issuer.Value,
                            name: issuer.Description
                        });
                    }
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