import { serviceParameterKeyOf } from '../../../Utils/Functions'

export interface IRatePlan {
    add?: {
        startDate: string
        endDate?: string
        ratePlanCode?: string
        ratePlanName?: string
        ratePlanDescription?: string
        currency?: string
        billingTiming?: Number
        automaticTerm?: boolean
        billingInterval?: string
        termStartDay?: number
        trialPeriodDays?: number
        trialPeriodMonths?: number
    }
    update?: {
        startDate: string
        endDate?: string
        ratePlanGuid: string
        charge: {
            ratePlanChargeCode?: string
            vatPercentage?: Number
            ratePlanChargeGuid?: string
            baseNumberOfUnits?: string | Number
            pricePerUnit?: Number
        }
    }
}

export interface IRatePlanCharges {
    add?: {
        ratePlanChargeName: string
        rateplanChargeProductId: Number | string
        rateplanChargeDescription: string
        unitOfMeasure: string
        ratePlanChargeType: string
        baseNumberOfUnits: Number
        partialBilling: string
        pricePerUnit: Number
        priceIncludesVat: boolean
        vatPercentage: Number
        b2B: boolean
    }
}
class AddRatePlan {
    startDate: string
    endDate: string
    ratePlanCode: string
    constructor(data, type) {
        this.startDate = data.startDate
        this.endDate = data.endDate
        this.ratePlanCode = data.ratePlanCode
        for (const dataKey in data) {
            this[dataKey] = data[dataKey]
        }
        this.groupType = () => 'AddRatePlan' + serviceParameterKeyOf(type)
    }
    groupType() {
        return 'AddRatePlan'
    }
}

class Charge {
    constructor(charge, type) {
        for (const chargeKey in charge) {
            this[chargeKey] = charge[chargeKey]
        }
        this.groupType = () => serviceParameterKeyOf(type) + 'RatePlanCharge'
    }
    groupType() {
        return 'RatePlanCharge'
    }
}

class UpdateRatePlan {
    update: {
        charge: Charge
    }
    constructor(update: any, type) {
        this.update = update
        this.update.charge = new Charge(update.charge, type)

        this.groupType = () => serviceParameterKeyOf(type) + 'UpdateRatePlan'
    }
    groupType() {
        return 'UpdateRatePlan'
    }
}

export class RatePlan {
    add?: AddRatePlan
    update?: UpdateRatePlan
    constructor(data, type = '') {
        if (data) {
            if (data.add) {
                this.add = new AddRatePlan(data.add, type)
            }
            if (data.update) {
                this.update = new UpdateRatePlan(data.update, type)
            }
        }
    }
}
