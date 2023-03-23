import Gender from '../../Constants/Gender'

export default interface IPerson {
    category?: string
    gender?: Gender
    culture?: string
    careOf?: string
    title?: string
    initials?: string
    name?: string
    firstName?: string
    lastNamePrefix?: string
    lastName?: string
    birthDate?: string
    placeOfBirth?: string
}
