"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDate = void 0;
var handleDate = function (data) {
    for (var payloadKey in data) {
        if (data[payloadKey] instanceof Date) {
            data[payloadKey] =
                data[payloadKey].getFullYear() +
                    '-' +
                    (data[payloadKey].getMonth() + 1) +
                    '-' +
                    data[payloadKey].getDate();
        }
    }
    return data;
};
exports.handleDate = handleDate;
//# sourceMappingURL=Create.js.map