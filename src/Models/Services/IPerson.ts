import RecipientCategory from '../../Constants/RecipientCategory'
import { ICustomer } from './ICustomer'

export default interface IPerson extends ICustomer {
    category: RecipientCategory.PERSON | RecipientCategory.B2C
    lastNamePrefix?: string
    birthDate: string
    placeOfBirth?: string
}
