import { Phone as IPhone } from '../../../Models/Interfaces/IPhone'
export default class Phone extends IPhone {
    get mobile(): string {
        return this.get('mobilePhone')
    }

    set mobile(phone: string) {
        this.set('mobilePhone', phone)
    }

    get landline(): string {
        return this.get('phone')
    }

    set landline(phone: string) {
        this.set('phone', phone)
    }
}
