"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buckarooClient = exports.initializeBuckarooClient = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var Client_1 = __importDefault(require("./Request/Client"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
var _credentials;
var _config;
var _client;
var defaultSetup = function () {
    var credentials = function (credentials) {
        _credentials = {
            websiteKey: (credentials === null || credentials === void 0 ? void 0 : credentials.websiteKey) ||
                (_credentials === null || _credentials === void 0 ? void 0 : _credentials.websiteKey) ||
                process.env.BPE_WEBSITE_KEY ||
                'KEY',
            secretKey: (credentials === null || credentials === void 0 ? void 0 : credentials.secretKey) ||
                (_credentials === null || _credentials === void 0 ? void 0 : _credentials.secretKey) ||
                process.env.BPE_SECRET_KEY ||
                'SECRET'
        };
    };
    var config = function (config) {
        _config = {
            mode: (config === null || config === void 0 ? void 0 : config.mode) || (_config === null || _config === void 0 ? void 0 : _config.mode) || process.env.BPE_MODE === 'live' ? 'live' : 'test',
            currency: (config === null || config === void 0 ? void 0 : config.currency) || (_config === null || _config === void 0 ? void 0 : _config.currency) || process.env.BPE_CURRENCY_CODE || 'EUR',
            returnURL: (config === null || config === void 0 ? void 0 : config.returnURL) || (_config === null || _config === void 0 ? void 0 : _config.returnURL) || process.env.BPE_RETURN_URL || '',
            returnURLCancel: (config === null || config === void 0 ? void 0 : config.returnURLCancel) ||
                (_config === null || _config === void 0 ? void 0 : _config.returnURLCancel) ||
                process.env.BPE_RETURN_URL_CANCEL ||
                '',
            pushURL: (config === null || config === void 0 ? void 0 : config.pushURL) || (_config === null || _config === void 0 ? void 0 : _config.pushURL) || process.env.BPE_PUSH_URL || ''
        };
    };
    return {
        credentials: credentials,
        config: config
    };
};
var initializeBuckarooClient = function (credentials, config) {
    // _config = config
    // _credentials = _credentials
    defaultSetup().credentials(credentials);
    defaultSetup().config(config);
    if (!_client)
        _client = Client_1.default.initialize(_credentials, _config);
    return {
        _credentials: _credentials,
        _config: _config
    };
};
exports.initializeBuckarooClient = initializeBuckarooClient;
var buckarooClient = function () { return _client; };
exports.buckarooClient = buckarooClient;
//# sourceMappingURL=BuckarooClient.js.map