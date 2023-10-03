import IAddress, { Address } from './IAddress'
import IPhone, { Phone } from './IPhone'
import { Company, ICompany, IPerson, Person } from './IRecipient'
import { Model } from '../Model'
import recipientCategory from '../../Constants/RecipientCategory'

export interface ICustomer {
    phone?: Partial<IPhone>
    email?: string
    recipient?: Partial<IPerson | ICompany>
    address?: Partial<IAddress>
}
export class Customer extends Model {
    set address(address: Partial<IAddress>) {
        this.set('address', new Address(address))
    }
    set email(email: string) {
        this.set('email', email)
    }
    set phone(phone: Partial<IPhone>) {
        this.set('phone', new Phone(phone))
    }
    set recipient(recipient: IPerson | ICompany) {
        if (recipient.category === recipientCategory.PERSON) {
            this.set('recipient', new Person(recipient))
        } else if (recipient.category === recipientCategory.COMPANY) {
            this.set('recipient', new Company(recipient))
        }
    }
}
