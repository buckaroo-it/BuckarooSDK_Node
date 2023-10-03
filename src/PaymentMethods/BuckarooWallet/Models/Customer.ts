import { Person } from '../../../Models/Interfaces/IRecipient'
import RecipientCategory from '../../../Constants/RecipientCategory'

export class Customer extends Person {
    set category(value: RecipientCategory.PERSON) {}
    set firstName(value: string) {
        this.set('consumerFirstName', value)
    }
    set lastName(value: string) {
        this.set('consumerLastName', value)
    }
}
