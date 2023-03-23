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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceParameters = void 0;
var Functions_1 = require("./Functions");
var ServiceObject_1 = require("../Models/ServiceObject");
var ServiceParameters = /** @class */ (function (_super) {
    __extends(ServiceParameters, _super);
    function ServiceParameters() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ServiceParameters.prototype.addParameter = function (value) {
        _super.prototype.addParameter.call(this, value, ServiceParameters);
    };
    Object.defineProperty(ServiceParameters.prototype, "groupType", {
        get: function () {
            var _a;
            return ((_a = this._groupType) === null || _a === void 0 ? void 0 : _a.call(this)) || '';
        },
        set: function (value) {
            this._groupType = function () { return value; };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServiceParameters.prototype, "groupId", {
        get: function () {
            var _a;
            var id = (_a = this._groupId) === null || _a === void 0 ? void 0 : _a.call(this);
            switch (typeof id) {
                case 'object':
                    return id.next().value;
                case 'undefined':
                    return '';
                default:
                    return id;
            }
        },
        set: function (value) {
            this._groupId = function () { return value; };
        },
        enumerable: false,
        configurable: true
    });
    ServiceParameters.prototype.setGroupType = function (type, key) {
        var _a, _b;
        if (!key) {
            this.groupType = type;
            return this;
        }
        else {
            var parameter = this.findParameterParent(key);
            if (parameter) {
                if (!(parameter[key] instanceof ServiceParameters)) {
                    parameter.addParameter((_a = {}, _a[key] = (_b = {}, _b[key] = parameter[key], _b), _a));
                }
                parameter[key].groupType = type;
                return parameter[key];
            }
        }
        return this;
    };
    ServiceParameters.prototype.setGroupId = function (id, key) {
        var _a, _b;
        if (!key) {
            this.groupId = id;
        }
        else {
            var parameter = this.findParameterParent(key);
            if (parameter) {
                if (!(parameter[key] instanceof ServiceParameters)) {
                    parameter.addParameter((_a = {}, _a[key] = (_b = {}, _b[key] = parameter[key], _b), _a));
                }
                parameter[key].groupId = id;
                return parameter[key];
            }
        }
    };
    ServiceParameters.prototype.setMultipleGroupType = function (groupTypes) {
        for (var groupKey in groupTypes) {
            var parameter = this.getParametersByName(groupKey);
            for (var _i = 0, parameter_1 = parameter; _i < parameter_1.length; _i++) {
                var parameterElement = parameter_1[_i];
                if (parameterElement[groupKey] instanceof ServiceParameters) {
                    parameterElement[groupKey].groupType = groupTypes[groupKey];
                }
            }
        }
    };
    ServiceParameters.prototype.makeCountable = function (param) {
        if (!param) {
            this.groupId = count();
        }
        else {
            var parameter = this.getParametersByName(param);
            for (var _i = 0, parameter_2 = parameter; _i < parameter_2.length; _i++) {
                var parameterElement = parameter_2[_i];
                parameterElement[param].groupId = count();
            }
        }
        return this;
    };
    ServiceParameters.toServiceParameterList = function (services, parameters, groupType, groupId) {
        if (parameters === void 0) { parameters = []; }
        if (groupType === void 0) { groupType = ''; }
        if (groupId === void 0) { groupId = ''; }
        for (var _i = 0, _a = Object.keys(services); _i < _a.length; _i++) {
            var serviceKey = _a[_i];
            if (typeof services[serviceKey] === 'object') {
                this.toServiceParameterList(services[serviceKey], parameters, services[serviceKey].groupType || groupType, services[serviceKey].groupId ||
                    (services instanceof ServiceParameters ? services.groupId : groupId));
            }
            else if (typeof services[serviceKey] !== 'function') {
                parameters.push({
                    Name: (0, Functions_1.firstUpperCase)(serviceKey),
                    Value: services[serviceKey],
                    GroupID: groupId,
                    GroupType: groupType
                });
            }
        }
        return parameters;
    };
    ServiceParameters.prototype.findParameter = function (param) {
        return _super.prototype.findParameter.call(this, param);
    };
    return ServiceParameters;
}(ServiceObject_1.ServiceObject));
exports.ServiceParameters = ServiceParameters;
function count() {
    var index;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                index = 0;
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                return [4 /*yield*/, index++];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}
//# sourceMappingURL=ServiceParameter.js.map