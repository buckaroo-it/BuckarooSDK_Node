"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionServices = void 0;
var ServiceParameter_1 = require("../../../Utils/ServiceParameter");
var Functions_1 = require("../../../Utils/Functions");
var subscriptionServices = function (data) {
    var serviceData = new ServiceParameter_1.ServiceParameters(data);
    serviceData.setMultipleGroupType({
        debtor: 'Debtor',
        person: 'Person',
        email: 'Email',
        address: 'Address',
        configuration: 'AddConfiguration'
    });
    if (serviceData.company) {
        serviceData.company.setKeys({
            companyName: 'Name'
        });
    }
    if (serviceData.ratePlans) {
        var types = Object.keys(serviceData.ratePlans);
        for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
            var type = types_1[_i];
            serviceData.ratePlans[type].groupType = (0, Functions_1.firstUpperCase)(type) + 'RatePlan';
        }
    }
    if (serviceData.ratePlanCharges) {
        var types = Object.keys(serviceData.ratePlanCharges.data);
        for (var _a = 0, types_2 = types; _a < types_2.length; _a++) {
            var type = types_2[_a];
            serviceData.ratePlanCharges[type].groupType = (0, Functions_1.firstUpperCase)(type) + 'RatePlanCharge';
        }
    }
    return serviceData;
};
exports.subscriptionServices = subscriptionServices;
//# sourceMappingURL=SubscriptionServices.js.map