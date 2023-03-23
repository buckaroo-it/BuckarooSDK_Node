"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var https = require('https');
var httpsCall = function (options) {
    return new Promise(function (resolve, reject) {
        var req = https.request(options, function (res) {
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            res.on('end', function () {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                }
                catch (e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', function (error) {
            console.log(error);
            reject(error);
        });
        if (options.data) {
            req.write(JSON.stringify(options.data));
        }
        req.end();
    });
};
exports.default = httpsCall;
//# sourceMappingURL=HttpClient.js.map