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
var PaymentMethod_1 = __importDefault(require("../PaymentMethod"));
var Verify_1 = require("./Models/Verify");
var Surepay = /** @class */ (function (_super) {
    __extends(Surepay, _super);
    function Surepay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._paymentName = 'surepay';
        _this._requiredFields = [];
        return _this;
    }
    Surepay.prototype.verify = function (payload) {
        this.action = 'verify';
        this.servicesStrategy = Verify_1.Verify;
        this.setRequest(payload);
        return this.dataRequest();
    };
    return Surepay;
}(PaymentMethod_1.default));
var _surepay;
var surepay = function () {
    if (!_surepay)
        _surepay = new Surepay();
    return _surepay;
};
exports.default = surepay;
//# sourceMappingURL=index.js.map