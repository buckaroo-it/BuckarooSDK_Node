// import IPerson from "../../../Models/IPerson";
import Model from '../../../Models/Model'

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
export default class Person extends Model implements IPerson {
    category: string = ''
    gender: string = ''
    initials?: string
    name?: string
    firstName: string = ''
    lastName: string = ''
    birthDate?: string
    placeOfBirth?: string

    constructor(data) {
        super()
        this.setParameters(data)
    }
}
