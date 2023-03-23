export interface IRatePlan {
    add?: {
        startDate: string
        ratePlanCode?: string
        endDate?: string
        ratePlanName?: string
        ratePlanDescription?: string
        currency?: string
        billingTiming?: Number
        automaticTerm?: boolean
        billingInterval?: string
        customNumberOfDays?: Number
        termStartDay?: number
        termStartWeek?: number
        termStartMonth?: number
        trialPeriodDays?: number
        trialPeriodMonths?: number
        inheritPaymentMethod?: boolean
    }
    update?: {
        startDate: string
        endDate?: string
        ratePlanGuid: string
    }
    disable?: {
        ratePlanGuid: string
    }
}

export interface IRatePlanCharges {
    add?: {
        ratePlanChargeCode?: string
        ratePlanChargeName: string
        ratePlanChargeProductId: Number | string
        ratePlanChargeDescription: string
        unitOfMeasure: string
        ratePlanChargeType: string
        baseNumberOfUnits: Number
        partialBilling: string
        pricePerUnit: Number
        priceIncludesVat: boolean
        vatPercentage: Number
        b2B: boolean
    }
    update?: {
        ratePlanChargeCode?: string
        vatPercentage?: Number
        ratePlanChargeGuid?: string
        baseNumberOfUnits?: string | Number
        pricePerUnit?: Number
        priceIncludesVat?: boolean
    }
    disable?: {
        ratePlanChargeGuid: string
    }
}
