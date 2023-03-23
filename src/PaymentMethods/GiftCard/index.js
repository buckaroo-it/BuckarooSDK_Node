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
var GiftCard = /** @class */ (function (_super) {
    __extends(GiftCard, _super);
    function GiftCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GiftCard.prototype.pay = function (payload) {
        return _super.prototype.pay.call(this, payload);
    };
    GiftCard.prototype.refund = function (payload) {
        return _super.prototype.refund.call(this, payload);
    };
    GiftCard.prototype.setPayload = function (payload) {
        this.paymentName = payload.name || this._paymentName;
        delete payload.name;
        _super.prototype.setPayload.call(this, payload);
    };
    return GiftCard;
}(PayablePaymentMethod_1.PayablePaymentMethod));
var _giftCard;
var giftCard = function () {
    if (!_giftCard)
        _giftCard = new GiftCard();
    return _giftCard;
};
exports.default = giftCard;
//# sourceMappingURL=index.js.map