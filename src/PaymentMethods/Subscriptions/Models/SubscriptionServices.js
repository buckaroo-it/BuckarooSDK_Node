"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionServices = void 0;
var ServiceParameter_1 = require("../../../Utils/ServiceParameter");
var Functions_1 = require("../../../Utils/Functions");
var subscriptionServices = function (data) {
    var serviceData = new ServiceParameter_1.ServiceParameterList(data);
    serviceData.setGroupTypes({
        debtor: 'Debtor',
        person: 'Person',
        email: 'Email',
        address: 'Address',
        configuration: 'AddConfiguration',
    });
    if (serviceData.list.company) {
        serviceData.list.company.setKeys({
            companyName: 'Name'
        });
    }
    if (serviceData.list.ratePlans) {
        var types = Object.keys(serviceData.list.ratePlans.data);
        for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
            var type = types_1[_i];
            serviceData.list.ratePlans.data[type].groupType = (0, Functions_1.serviceParameterKeyOf)(type) + 'RatePlan';
        }
    }
    if (serviceData.list.ratePlanCharges) {
        var types = Object.keys(serviceData.list.ratePlanCharges.data);
        for (var _a = 0, types_2 = types; _a < types_2.length; _a++) {
            var type = types_2[_a];
            serviceData.list.ratePlanCharges.data[type].groupType = (0, Functions_1.serviceParameterKeyOf)(type) + 'RatePlanCharge';
        }
    }
    return serviceData;
};
exports.subscriptionServices = subscriptionServices;
//# sourceMappingURL=SubscriptionServices.js.map