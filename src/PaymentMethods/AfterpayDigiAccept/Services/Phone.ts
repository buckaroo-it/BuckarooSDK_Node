import { Phone as PhoneClass } from '../../../Models/Interfaces/IPhone'
export class Phone extends PhoneClass {
    set mobile(value: string) {
        this.set('phoneNumber', value)
    }
}
