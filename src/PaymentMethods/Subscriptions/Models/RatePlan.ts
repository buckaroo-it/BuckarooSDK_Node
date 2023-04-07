type update = {
    update: {
        startDate: string
        endDate?: string
        ratePlanGuid: string
    }
}
type disable = {
    disable: {
        ratePlanGuid: string
    }
}
type add = {
    add: {
        startDate: string
        ratePlanCode?: string
        endDate?: string
        ratePlanName?: string
        ratePlanDescription?: string
        currency?: string
        billingTiming?: number
        automaticTerm?: boolean
        billingInterval?: string
        customNumberOfDays?: number
        termStartDay?: number
        termStartWeek?: number
        termStartMonth?: number
        trialPeriodDays?: number
        trialPeriodMonths?: number
        inheritPaymentMethod?: boolean
    }
}

export type IRatePlan = add | update | disable

export type IRatePlanCharge = {
    add?: {
        ratePlanChargeCode?: string
        ratePlanChargeName: string
        ratePlanChargeProductId: string
        ratePlanChargeDescription: string
        unitOfMeasure: string
        ratePlanChargeType: string
        baseNumberOfUnits: number
        partialBilling: string
        pricePerUnit: number
        priceIncludesVat: boolean
        vatPercentage: number
        b2B: boolean
    }
    update?: {
        ratePlanChargeCode?: string
        vatPercentage?: number
        ratePlanChargeGuid?: string
        baseNumberOfUnits?: string | number
        pricePerUnit?: number
        priceIncludesVat?: boolean
    }
    disable?: {
        ratePlanChargeGuid: string
    }
}
