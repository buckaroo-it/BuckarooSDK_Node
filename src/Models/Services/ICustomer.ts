import RecipientCategory from "../../Constants/RecipientCategory";
import Gender from "../../Constants/Gender";

export interface ICustomer {
    category: RecipientCategory
    firstName: string
    lastName: string
    gender?: Gender | string
}