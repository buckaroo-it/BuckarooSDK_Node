import { Model } from '../../../Models/Model';

export interface IRatePlans {
    add?: IRatePlan;
    update?: IRatePlan;
    disable?: IRatePlan;
}
export interface IRatePlan {
    type?: string;
    ratePlanGuid?: string;
    ratePlanCode?: string;
    startDate?: string;
    endDate?: string;
    ratePlanName?: string;
    ratePlanDescription?: string;
    currency?: string;
    billingTiming?: number;
    automaticTerm?: boolean;
    billingInterval?: string;
    customNumberOfDays?: number;
    termStartDay?: number;
    termStartWeek?: string;
    termStartMonth?: string;
    trialPeriodDays?: number;
    trialPeriodMonth?: string;
    inheritPaymentMethod?: boolean;
}
export class RatePlan extends Model implements IRatePlan {
    set type(value: string) {
        this.set('type', value);
    }
    set ratePlanGuid(value: string) {
        this.set('ratePlanGuid', value);
    }
    set ratePlanCode(value: string) {
        this.set('ratePlanCode', value);
    }
    set startDate(value: string) {
        this.set('startDate', value);
    }
    set endDate(value: string) {
        this.set('endDate', value);
    }
    set ratePlanName(value: string) {
        this.set('ratePlanName', value);
    }
    set ratePlanDescription(value: string) {
        this.set('ratePlanDescription', value);
    }
    set currency(value: string) {
        this.set('currency', value);
    }
    set billingTiming(value: number) {
        this.set('billingTiming', value);
    }
    set automaticTerm(value: boolean) {
        this.set('automaticTerm', value);
    }
    set billingInterval(value: string) {
        this.set('billingInterval', value);
    }
    set customNumberOfDays(value: number) {
        this.set('customNumberOfDays', value);
    }
    set termStartDay(value: number) {
        this.set('termStartDay', value);
    }
    set termStartWeek(value: string) {
        this.set('termStartWeek', value);
    }
    set termStartMonth(value: string) {
        this.set('termStartMonth', value);
    }
    set trialPeriodDays(value: number) {
        this.set('trialPeriodDays', value);
    }
    set trialPeriodMonth(value: string) {
        this.set('trialPeriodMonth', value);
    }
    set inheritPaymentMethod(value: boolean) {
        this.set('inheritPaymentMethod', value);
    }
}
