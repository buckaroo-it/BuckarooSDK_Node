import { Phone as PhoneClass } from '../../../Models/Interfaces/IPhone'
export class Phone extends PhoneClass {
    set fax(fax: string) {
        this.set('mobilePhone', fax)
    }
    set landline(landline: string) {
        this.set('mobilePhone', landline)
    }
    set mobile(mobile: string) {
        this.set('mobilePhone', mobile)
    }
}
