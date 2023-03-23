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
var Subscriptions_1 = __importDefault(require("../PaymentMethods/Subscriptions"));
var Ideal_1 = __importDefault(require("../PaymentMethods/Ideal"));
(0, BuckarooClient_1.initializeBuckarooClient)();
var subscription = (0, Subscriptions_1.default)();
var ideal = (0, Ideal_1.default)();
test('Create', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        subscription
            .create({
            configurationCode: 'jpu9xccp',
            debtor: {
                code: 'Vegim Carkaxhija'
            },
            email: 'vegim@buckaroo.nl',
            person: {
                firstName: 'John',
                lastName: 'Do',
                gender: 1,
                culture: 'nl-NL',
                birthDate: '1990-01-01'
            },
            configuration: {
                name: 'TestVegim'
            },
            ratePlans: {
                add: {
                    startDate: '2023-03-10',
                    // ratePlanCode: "zfv59mmy",
                    endDate: '2023-06-10',
                    ratePlanName: 'Test',
                    ratePlanDescription: 'Test',
                    currency: 'EUR',
                    billingTiming: 2,
                    automaticTerm: true,
                    billingInterval: 'Monthly',
                    termStartDay: 1,
                    trialPeriodDays: 0,
                    trialPeriodMonths: 0
                }
            },
            ratePlanCharges: {
                add: {
                    ratePlanChargeName: 'pay and use',
                    ratePlanChargeProductId: '',
                    ratePlanChargeDescription: 'asd',
                    unitOfMeasure: '',
                    ratePlanChargeType: 'Recurring',
                    baseNumberOfUnits: 1,
                    partialBilling: 'Nobilling',
                    pricePerUnit: 20,
                    priceIncludesVat: false,
                    vatPercentage: 0,
                    b2B: false
                }
            }
        })
            .then(function (data) {
            expect(data).toBeDefined();
        });
        return [2 /*return*/];
    });
}); });
test('Update', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        subscription
            .update({
            email: 'vegim@buckaroo.nl',
            subscriptionGuid: 'FC512FC9CC3A485D8CF3D1804FF6xxxx',
            configurationCode: '9wqe32ew',
            ratePlans: {
                update: {
                    ratePlanGuid: 'F075470B1BB24B9291943A888A2Fxxxx',
                    startDate: '2022-01-01',
                    endDate: '2030-01-01'
                }
            }
        })
            .then(function (data) {
            console.log(data);
            expect(data).toBeDefined();
        });
        return [2 /*return*/];
    });
}); });
test('Combined Subscription', function () { return __awaiter(void 0, void 0, void 0, function () {
    var combinable;
    return __generator(this, function (_a) {
        combinable = subscription.createCombined({
            includeTransaction: false,
            transactionVatPercentage: 5,
            configurationCode: 'gfyh9fe4',
            email: 'test@buckaroo.nl',
            ratePlans: {
                add: {
                    startDate: '2033-01-01',
                    ratePlanCode: '9863hdcj'
                }
            },
            phone: {
                mobile: '0612345678'
            },
            debtor: {
                code: 'johnsmith4'
            },
            company: {
                culture: 'nl-NL',
                companyName: 'My Company Coporation',
                vatApplicable: true,
                chamberOfCommerce: '20091741'
            },
            address: {
                street: 'Hoofdstraat',
                houseNumber: '90',
                zipcode: '8441ER',
                city: 'Heerenveen',
                country: 'NL'
            }
        });
        return [2 /*return*/];
    });
}); });
// test('Update Combined Subscription', async () => {
//     const combinable = subscription.updateCombined({
//         subscriptionGuid: '515461997AD34C50881D74157E38A64D'
//     })
//     ideal
//         .combine(combinable)
//         .pay({
//             issuer: 'ABNANL2A',
//             amountDebit: 10
//         })
//         .then((res) => {
//             console.log(res)
//         })
// })
test('Stop Subscription', function () { return __awaiter(void 0, void 0, void 0, function () {
    var stop;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, subscription.stop({
                    subscriptionGuid: '515461997AD34C50881D74157E38A64D'
                })];
            case 1:
                stop = _a.sent();
                console.log(stop);
                expect(stop).toBeDefined();
                return [2 /*return*/];
        }
    });
}); });
test('Subscription Info', function () { return __awaiter(void 0, void 0, void 0, function () {
    var info;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, subscription.info({
                    subscriptionGuid: '515461997AD34C50881D74157E38A64D'
                })];
            case 1:
                info = _a.sent();
                console.log(info);
                expect(info).toBeDefined();
                return [2 /*return*/];
        }
    });
}); });
test('Delete Subscription Config', function () { return __awaiter(void 0, void 0, void 0, function () {
    var deleteConfig;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, subscription.deletePaymentConfig({
                    subscriptionGuid: '515461997AD34C50881D74157E38A64D'
                })];
            case 1:
                deleteConfig = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('Subscription Pause', function () { return __awaiter(void 0, void 0, void 0, function () {
    var pause;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, subscription.pause({
                    subscriptionGuid: '515461997AD34C50881D74157E38A64D',
                    resumeDate: '2030-01-01'
                })];
            case 1:
                pause = _a.sent();
                console.log(pause);
                expect(pause).toBeDefined();
                return [2 /*return*/];
        }
    });
}); });
test('Subscription Resume', function () { return __awaiter(void 0, void 0, void 0, function () {
    var resume;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, subscription.resume({
                    resumeDate: '2030-01-01',
                    subscriptionGuid: '515461997AD34C50881D74157E38A64D'
                })];
            case 1:
                resume = _a.sent();
                console.log(resume);
                expect(resume).toBeDefined();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=Subscriptions.test.js.map