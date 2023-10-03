import { Model } from '../../../Models/Model'

export interface IRatePlanCharge {
    ratePlanChargeCode?: string
    ratePlanChargeName?: string
    ratePlanChargeProductId?: string
    ratePlanChargeDescription?: string
    unitOfMeasure?: string
    baseNumberOfUnits?: number
    partialBilling?: string
    pricePerUnit?: number
    priceIncludesVat?: boolean
    vatPercentage?: number
    b2b?: string
    ratePlanChargeType?: string
}
export interface IRatePlanCharges {
    add?: IRatePlanCharge
    update?: IRatePlanCharge
    disable?: IRatePlanCharge
}
export class RatePlanCharge extends Model implements IRatePlanCharge {
    set ratePlanChargeCode(value: string) {
        this.set('ratePlanChargeCode', value)
    }
    set ratePlanChargeName(value: string) {
        this.set('ratePlanChargeName', value)
    }
    set ratePlanChargeProductId(value: string) {
        this.set('rateplanChargeProductId', value)
    }
    set ratePlanChargeDescription(value: string) {
        this.set('rateplanChargeDescription', value)
    }
    set unitOfMeasure(value: string) {
        this.set('unitOfMeasure', value)
    }
    set baseNumberOfUnits(value: number) {
        this.set('baseNumberOfUnits', value)
    }
    set partialBilling(value: string) {
        this.set('partialBilling', value)
    }
    set pricePerUnit(value: number) {
        this.set('pricePerUnit', value)
    }
    set priceIncludesVat(value: boolean) {
        this.set('priceIncludesVat', value)
    }
    set vatPercentage(value: number) {
        this.set('vatPercentage', value)
    }
    set b2b(value: string) {
        this.set('b2B', value)
    }
    set ratePlanChargeType(value: string) {
        this.set('ratePlanChargeType', value)
    }
}
