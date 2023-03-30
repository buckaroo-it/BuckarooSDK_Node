import RecipientCategory from "../../Constants/RecipientCategory";
import {ICustomer} from "./ICustomer";

export default interface IPerson extends ICustomer {
    category: RecipientCategory.PERSON | RecipientCategory.B2C
    culture?: string
    careOf: string
    title: string
    initials?: string
    name?: string
    firstName: string
    lastNamePrefix?: string
    lastName: string
    birthDate?: string
    placeOfBirth?: string
}
