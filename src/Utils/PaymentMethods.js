"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Methods = void 0;
var Afterpay_1 = __importDefault(require("../PaymentMethods/Afterpay"));
var AfterpayDigiAccept_1 = __importDefault(require("../PaymentMethods/AfterpayDigiAccept"));
var Alipay_1 = __importDefault(require("../PaymentMethods/Alipay"));
var ApplePay_1 = __importDefault(require("../PaymentMethods/ApplePay"));
var Bancontact_1 = __importDefault(require("../PaymentMethods/Bancontact"));
var BankTransfer_1 = __importDefault(require("../PaymentMethods/BankTransfer"));
var Belfius_1 = __importDefault(require("../PaymentMethods/Belfius"));
var Billink_1 = __importDefault(require("../PaymentMethods/Billink"));
var BuckarooVoucher_1 = __importDefault(require("../PaymentMethods/BuckarooVoucher"));
var CreditClick_1 = __importDefault(require("../PaymentMethods/CreditClick"));
var CreditManagement_1 = __importDefault(require("../PaymentMethods/CreditManagement"));
var EPS_1 = __importDefault(require("../PaymentMethods/EPS"));
var GiftCard_1 = __importDefault(require("../PaymentMethods/GiftCard"));
var Giropay_1 = __importDefault(require("../PaymentMethods/Giropay"));
var Ideal_1 = __importDefault(require("../PaymentMethods/Ideal"));
var iDealQR_1 = __importDefault(require("../PaymentMethods/iDealQR"));
var In3_1 = __importDefault(require("../PaymentMethods/In3"));
var KBC_1 = __importDefault(require("../PaymentMethods/KBC"));
var Klarna_1 = __importDefault(require("../PaymentMethods/Klarna"));
var Payconiq_1 = __importDefault(require("../PaymentMethods/Payconiq"));
var Paypal_1 = __importDefault(require("../PaymentMethods/Paypal"));
var PayPerEmail_1 = __importDefault(require("../PaymentMethods/PayPerEmail"));
var Przelewy24_1 = __importDefault(require("../PaymentMethods/Przelewy24"));
var SEPA_1 = __importDefault(require("../PaymentMethods/SEPA"));
var Sofort_1 = __importDefault(require("../PaymentMethods/Sofort"));
var Subscriptions_1 = __importDefault(require("../PaymentMethods/Subscriptions"));
var Surepay_1 = __importDefault(require("../PaymentMethods/Surepay"));
var Tinka_1 = __importDefault(require("../PaymentMethods/Tinka"));
var Trustly_1 = __importDefault(require("../PaymentMethods/Trustly"));
var WeChatPay_1 = __importDefault(require("../PaymentMethods/WeChatPay"));
var Methods = /** @class */ (function () {
    function Methods() {
        this._afterpay = Afterpay_1.default;
        this._afterPayDigiAccept = AfterpayDigiAccept_1.default;
        this._alipay = Alipay_1.default;
        this._applePay = ApplePay_1.default;
        this._bancontact = Bancontact_1.default;
        this._banktransfer = BankTransfer_1.default;
        this._belfius = Belfius_1.default;
        this._billink = Billink_1.default;
        this._buckarooVoucher = BuckarooVoucher_1.default;
        this._creditClick = CreditClick_1.default;
        this._creditManagement = CreditManagement_1.default;
        this._eps = EPS_1.default;
        this._giftcard = GiftCard_1.default;
        this._giropay = Giropay_1.default;
        this._ideal = Ideal_1.default;
        this._iDEALQR = iDealQR_1.default;
        this._in3 = In3_1.default;
        this._kbc = KBC_1.default;
        this._klarna = Klarna_1.default;
        this._payconiq = Payconiq_1.default;
        this._paypal = Paypal_1.default;
        this._payperemail = PayPerEmail_1.default;
        this._przelewy24 = Przelewy24_1.default;
        this._sepa = SEPA_1.default;
        this._sofort = Sofort_1.default;
        this._subscriptions = Subscriptions_1.default;
        this._surepay = Surepay_1.default;
        this._tinka = Tinka_1.default;
        this._trustly = Trustly_1.default;
        this._wechatPay = WeChatPay_1.default;
    }
    Object.defineProperty(Methods.prototype, "afterpay", {
        get: function () {
            return this._afterpay();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "afterPayDigiAccept", {
        get: function () {
            return this._afterPayDigiAccept();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "alipay", {
        get: function () {
            return this._alipay();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "applePay", {
        get: function () {
            return this._applePay();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "bancontact", {
        get: function () {
            return this._bancontact();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "banktransfer", {
        get: function () {
            return this._banktransfer();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "belfius", {
        get: function () {
            return this._belfius();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "billink", {
        get: function () {
            return this._billink();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "buckarooVoucher", {
        get: function () {
            return this._buckarooVoucher();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "creditClick", {
        get: function () {
            return this._creditClick();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "creditManagement", {
        get: function () {
            return this._creditManagement();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "eps", {
        get: function () {
            return this._eps();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "giftcard", {
        get: function () {
            return this._giftcard();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "giropay", {
        get: function () {
            return this._giropay();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "ideal", {
        get: function () {
            return this._ideal();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "iDEALQR", {
        get: function () {
            return this._iDEALQR();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "in3", {
        get: function () {
            return this._in3();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "kbc", {
        get: function () {
            return this._kbc();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "klarna", {
        get: function () {
            return this._klarna();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "payconiq", {
        get: function () {
            return this._payconiq();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "paypal", {
        get: function () {
            return this._paypal();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "payperemail", {
        get: function () {
            return this._payperemail();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "przelewy24", {
        get: function () {
            return this._przelewy24();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "sepa", {
        get: function () {
            return this._sepa();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "sofort", {
        get: function () {
            return this._sofort();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "subscriptions", {
        get: function () {
            return this._subscriptions();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "surepay", {
        get: function () {
            return this._surepay();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "tinka", {
        get: function () {
            return this._tinka();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "trustly", {
        get: function () {
            return this._trustly();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Methods.prototype, "wechatPay", {
        get: function () {
            return this._wechatPay();
        },
        enumerable: false,
        configurable: true
    });
    return Methods;
}());
exports.Methods = Methods;
//# sourceMappingURL=PaymentMethods.js.map