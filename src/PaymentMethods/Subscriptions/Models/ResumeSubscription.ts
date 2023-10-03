import { Subscription } from './ISubscription'

export class ResumeSubscription extends Subscription {
    set resumeDate(resumeDate: string) {
        this.set('resumeDate', resumeDate)
    }
}
