export type IPerson = {
    category: string
    gender: string
    initials?: string
    name?: string
    firstName: string
    lastName: string
    birthDate?: string
    placeOfBirth?: string
}
export default class Person implements IPerson {
    category: string = ''
    gender: string = ''
    initials?: string
    name?: string
    firstName: string = ''
    lastName: string = ''
    birthDate?: string
    placeOfBirth?: string

    constructor(data) {
        this.category = data.category
        this.firstName = data.firstName
        this.initials = data.initials
        this.name = data.name
        this.gender = data.gender
        this.birthDate = data.birthDate
        this.lastName = data.lastName
        this.placeOfBirth = data.placeOfBirth
    }
}
