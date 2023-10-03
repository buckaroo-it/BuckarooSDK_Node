import { Model } from '../Model'

export default interface IEmail {
    email: string
}
export class Email extends Model implements IEmail {
    constructor(data: IEmail) {
        super(data)
    }
    get email() {
        return ''
    }
    set email(email: string) {
        this.set('email', email)
    }
}
