"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BuckarooClient_1 = require("../BuckarooClient");
var Afterpay_1 = __importDefault(require("../PaymentMethods/Afterpay"));
var RecipientCategory_1 = __importDefault(require("../Constants/RecipientCategory"));
var Functions_1 = require("../Utils/Functions");
(0, BuckarooClient_1.initializeBuckarooClient)();
var method = (0, Afterpay_1.default)();
describe('testing methods', function () {
    test('Pay Simple Payload', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    method.setPayload({
                        order: (0, Functions_1.uniqid)(),
                        invoice: (0, Functions_1.uniqid)(),
                        clientIP: '127.0.0.1',
                        amountDebit: 52.3,
                        billing: {
                            recipient: {
                                category: RecipientCategory_1.default.PERSON,
                                careOf: 'John Smith',
                                firstName: 'John',
                                lastName: 'Do',
                                birthDate: '1990-01-01',
                                conversationLanguage: 'NL',
                                // identificationNumber: "IdNumber12345",
                                customerNumber: 'customerNumber12345'
                            },
                            address: {
                                street: 'Hoofdstraat',
                                houseNumber: '13',
                                houseNumberAdditional: 'a',
                                zipcode: '1234AB',
                                city: 'Heerenveen',
                                country: 'NL'
                            },
                            phone: {
                                mobile: '0698765433'
                            },
                            email: 'test@buckaroo.nl'
                        },
                        articles: [
                            {
                                identifier: 'Articlenumber1',
                                description: 'Blue Toy Car',
                                vatPercentage: 21,
                                quantity: 2,
                                price: 20.1
                            },
                            {
                                identifier: 'Articlenumber2',
                                description: 'Red Toy Car',
                                vatPercentage: 21,
                                quantity: 1,
                                price: 10.1
                            },
                            {
                                type: 'ShippingFee',
                                identifier: 'USPShippingID',
                                description: 'UPS',
                                vatPercentage: 21,
                                quantity: 1,
                                price: 2
                            }
                        ]
                    });
                    return [4 /*yield*/, method.pay().then(function (data) {
                            expect(data).toBeDefined();
                            console.log(data.find('ParameterErrors') || data.find('Parameters'));
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Refund', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    method.setRequest(payload);
                    return [4 /*yield*/, method
                            .refund({
                            amountCredit: 3,
                            clientIP: '127.0.0.1',
                            originalTransactionKey: '',
                            articles: [
                                {
                                    brand: '',
                                    description: '',
                                    price: 31,
                                    identifier: '',
                                    imageUrl: '',
                                    manufacturer: '',
                                    marketPlaceSellerId: '',
                                    quantity: 1,
                                    refundType: 'Return',
                                    type: 'PhysicalArticle',
                                    unitCode: '',
                                    url: '',
                                    vatCategory: 0,
                                    vatPercentage: 0
                                }
                            ]
                        })
                            .then(function (data) {
                            expect(data).toBeDefined();
                            console.log(data);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Specifications', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, method.specification().then(function (data) {
                        expect(data).toBeDefined();
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Authorize', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    method.setRequest(payload);
                    return [4 /*yield*/, method.authorize().then(function (data) {
                            expect(data).toBeDefined();
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('CancelAuthorize', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    method.setRequest(payload);
                    return [4 /*yield*/, method.cancelAuthorize().then(function (data) {
                            expect(data).toBeTruthy();
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Capture', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, method
                        .capture({
                        amountDebit: 0,
                        invoice: '123456789',
                        originalTransactionKey: '123456789'
                    })
                        .then(function (data) {
                        expect(data).toBeDefined();
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
var payload = {
    order: (0, Functions_1.uniqid)(),
    invoice: (0, Functions_1.uniqid)(),
    clientIP: '127.0.0.1',
    amountDebit: 52.3,
    billing: {
        recipient: {
            category: RecipientCategory_1.default.PERSON,
            careOf: 'John Smith',
            firstName: 'John',
            lastName: 'Do',
            birthDate: '1990-01-01',
            conversationLanguage: 'NL',
            // identificationNumber: "IdNumber12345",
            customerNumber: 'customerNumber12345'
        },
        address: {
            street: 'Hoofdstraat',
            houseNumber: '13',
            houseNumberAdditional: 'a',
            zipcode: '1234AB',
            city: 'Heerenveen',
            country: 'NL'
        },
        phone: {
            mobile: '0698765433',
            landline: '0109876543'
        },
        email: 'test@buckaroo.nl'
    },
    articles: [
        {
            identifier: 'Articlenumber1',
            description: 'Blue Toy Car',
            vatPercentage: '21',
            quantity: '2',
            price: '20.10'
        },
        {
            identifier: 'Articlenumber2',
            description: 'Red Toy Car',
            vatPercentage: '21',
            quantity: '1',
            price: '10.10'
        },
        {
            type: 'ShippingFee',
            identifier: 'USPShippingID',
            description: 'UPS',
            vatPercentage: '21',
            quantity: '1',
            price: '2'
        }
    ]
};
//# sourceMappingURL=AfterPay.test.js.map