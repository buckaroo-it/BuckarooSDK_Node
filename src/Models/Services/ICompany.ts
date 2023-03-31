import RecipientCategory from '../../Constants/RecipientCategory'
import { ICustomer } from './ICustomer'

export default interface ICompany extends ICustomer {
    category: RecipientCategory.COMPANY | RecipientCategory.B2B
    companyName: string
    vatApplicable: boolean
    vatNumber: string
    chamberOfCommerce: string
}
