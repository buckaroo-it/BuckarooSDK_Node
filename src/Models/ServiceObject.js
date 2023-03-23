"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceObject = void 0;
var Functions_1 = require("../Utils/Functions");
var ServiceObject = /** @class */ (function () {
    function ServiceObject(data) {
        this.addParameter(data);
    }
    ServiceObject.prototype.addParameter = function (parameters, classType) {
        if (classType === void 0) { classType = ServiceObject; }
        for (var _i = 0, _a = Object.entries(parameters); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (value instanceof ServiceObject) {
                this[(0, Functions_1.firstLowerCase)(key)] = value;
            }
            else if (value && typeof value === 'object') {
                this[(0, Functions_1.firstLowerCase)(key)] = new classType(value);
            }
            else if (typeof value !== 'function') {
                this[(0, Functions_1.firstLowerCase)(key)] = value;
            }
        }
    };
    ServiceObject.prototype.findParameter = function (param) {
        var find = this.findParameterParent(param);
        if (find && find[param] instanceof ServiceObject) {
            return find[param];
        }
    };
    ServiceObject.prototype.find = function (param) {
        var find = this.findParameterParent(param);
        if (find) {
            return find[param];
        }
    };
    ServiceObject.prototype.findParameterParent = function (param) {
        if (this[param]) {
            return this;
        }
        var tree = Object.values(this).filter(function (a) { return a instanceof ServiceObject && Object.keys(a).length > 0; });
        if (tree.length > 0) {
            for (var _i = 0, tree_1 = tree; _i < tree_1.length; _i++) {
                var treeElement = tree_1[_i];
                var parameter = treeElement.findParameterParent(param);
                if (parameter) {
                    return parameter;
                }
            }
        }
    };
    ServiceObject.prototype.setParameterKeys = function (keys) {
        var _a;
        for (var parameterKey in keys) {
            var parameters = this.getParametersByName(parameterKey);
            if (parameters.length > 0) {
                for (var _i = 0, parameters_1 = parameters; _i < parameters_1.length; _i++) {
                    var parameter = parameters_1[_i];
                    delete Object.assign(parameter, (_a = {},
                        _a[keys[parameterKey]] = parameter[parameterKey],
                        _a))[parameterKey];
                }
            }
        }
        return this;
    };
    ServiceObject.prototype.removeParameterKeys = function (keys) {
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var parameter = this.findParameterParent(key);
            if (parameter) {
                delete this[key];
            }
        }
    };
    ServiceObject.prototype.getParametersByName = function (param, parameters) {
        var _this = this;
        if (parameters === void 0) { parameters = []; }
        Object.entries(this).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (key == param) {
                parameters.push(_this);
            }
            else if (value instanceof ServiceObject) {
                value.getParametersByName(param, parameters);
            }
        });
        return parameters;
    };
    return ServiceObject;
}());
exports.ServiceObject = ServiceObject;
//# sourceMappingURL=ServiceObject.js.map