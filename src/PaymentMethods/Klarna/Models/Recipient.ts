import IAddress from '../../../Models/Interfaces/IAddress'
import IPhone from '../../../Models/Interfaces/IPhone'
import { Model } from '../../../Models/Model'
import { KlarnaAddress } from '../Services/KlarnaAddress'
import { Company, ICompany, IPerson, Person } from '../../../Models/Interfaces/IRecipient'
import { KlarnaPhone } from '../Services/KlarnaPhone'
import RecipientCategory from '../../../Constants/RecipientCategory'
import { ICustomer } from '../../../Models/Interfaces/ICustomer'

export class KlarnaRecipient extends Model implements ICustomer {
    set email(email: string) {
        this.set('email', email)
    }
    set address(address: IAddress) {
        this.set('address', new KlarnaAddress(address))
    }
    set recipient(recipient: Partial<IPerson | ICompany>) {
        if (recipient.category === RecipientCategory.PERSON) {
            // @ts-ignore
            this.set('recipient', new Person({ ...recipient, category: 'B2C' }))
        } else if (recipient.category === RecipientCategory.COMPANY) {
            // @ts-ignore
            this.set('recipient', new Company({ ...recipient, category: 'B2B' }))
        }
    }
    set phone(phone: IPhone) {
        this.set('phone', new KlarnaPhone(phone))
    }
}
