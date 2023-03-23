"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var md5_1 = __importDefault(require("crypto-js/md5"));
var hmac_sha256_1 = __importDefault(require("crypto-js/hmac-sha256"));
var enc_base64_1 = __importDefault(require("crypto-js/enc-base64"));
var BuckarooClient_1 = require("../BuckarooClient");
var hmacHeader = function (method, url, data) {
    var _a;
    if (url === void 0) { url = ''; }
    if (data === void 0) { data = ''; }
    var base64Data = data;
    var nonce = 'nonce_' + Math.floor(Math.random() * 9999999 + 1);
    var time = String(Math.round(Date.now() / 1000));
    if (url) {
        url = url.replace(/^[^:/.]*[:/]+/i, '');
        url = encodeURIComponent(url).toLowerCase() || '';
    }
    if (base64Data) {
        if (typeof base64Data === 'object') {
            base64Data = JSON.stringify(data);
        }
        base64Data = enc_base64_1.default.stringify((0, md5_1.default)(base64Data));
    }
    var hashString = (0, BuckarooClient_1.buckarooClient)().getCredentials().websiteKey + method + url + time + nonce + base64Data;
    return ("hmac " +
        "".concat((0, BuckarooClient_1.buckarooClient)().getCredentials().websiteKey, ":").concat(enc_base64_1.default.stringify((0, hmac_sha256_1.default)(hashString, (_a = (0, BuckarooClient_1.buckarooClient)().getCredentials().secretKey) !== null && _a !== void 0 ? _a : '')), ":").concat(nonce, ":").concat(time));
};
exports.default = hmacHeader;
//# sourceMappingURL=Hmac.js.map