"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstLowerCase = exports.firstUpperCase = exports.uniqid = void 0;
function uniqid(prefix, random) {
    if (prefix === void 0) { prefix = ''; }
    if (random === void 0) { random = false; }
    var sec = Date.now() * 1000 + Math.random() * 1000;
    var id = sec.toString(16).replace(/\./g, '').padEnd(14, '0');
    return "".concat(prefix).concat(id).concat(random ? ".".concat(Math.trunc(Math.random() * 100000000)) : '');
}
exports.uniqid = uniqid;
function firstUpperCase(propertyName) {
    return propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
}
exports.firstUpperCase = firstUpperCase;
function firstLowerCase(propertyName) {
    return propertyName.charAt(0).toLowerCase() + propertyName.slice(1);
}
exports.firstLowerCase = firstLowerCase;
//# sourceMappingURL=Functions.js.map