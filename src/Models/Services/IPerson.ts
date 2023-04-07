import RecipientCategory from '../../Constants/RecipientCategory'
import { ICustomer } from './ICustomer'

type IPerson = ICustomer & {
    category: RecipientCategory.PERSON | RecipientCategory.B2C
    lastNamePrefix?: string
    birthDate: string
    placeOfBirth?: string
}
export default IPerson
