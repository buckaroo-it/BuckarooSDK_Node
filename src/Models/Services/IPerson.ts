import Gender from '../../Constants/Gender'
import RecipientCategory from "../../Constants/RecipientCategory";

export default interface IPerson {
    category: RecipientCategory
    gender: Gender
    culture?: string
    careOf: string
    title: string
    initials?: string
    name: string
    firstName: string
    lastNamePrefix?: string
    lastName: string
    birthDate?: string
    placeOfBirth: string
}
