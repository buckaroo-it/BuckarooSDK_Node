import RecipientCategory from '../../Constants/RecipientCategory'
import { Model } from '../Model'
import Gender from '../../Constants/Gender'

export interface IRecipient {
    [key: string]: any
}
export interface IPerson extends IRecipient {
    category: RecipientCategory.PERSON
    gender: string | Gender
    culture: string
    careOf?: string
    title?: string
    initials?: string
    firstName: string
    lastName?: string
    lastNamePrefix?: string
    birthDate: string
    placeOfBirth: string
}
export interface ICompany extends IRecipient {
    category: RecipientCategory.COMPANY
    companyName: string
    culture: string
    vatApplicable: boolean
    vatNumber: string
    chamberOfCommerce: string
}
export class Person extends Model implements IPerson {
    constructor(data: Partial<IPerson>) {
        super(data)
    }
    set birthDate(value: string) {
        this.set('birthDate', value)
    }
    set careOf(value: string) {
        this.set('careOf', value)
    }
    set category(value: RecipientCategory.PERSON) {
        this.set('category', value)
    }
    set culture(value: string) {
        this.set('culture', value)
    }
    set firstName(value: string) {
        this.set('firstName', value)
    }
    set gender(value: string) {
        this.set('gender', value)
    }
    set initials(value: string) {
        this.set('initials', value)
    }
    set lastName(value: string) {
        this.set('lastName', value)
    }
    set lastNamePrefix(value: string) {
        this.set('lastNamePrefix', value)
    }
    set placeOfBirth(value: string) {
        this.set('placeOfBirth', value)
    }
    set title(value: string) {
        this.set('title', value)
    }
}
export class Company extends Person implements ICompany {
    constructor(data: Partial<ICompany>) {
        super(data as any)
    }
    // @ts-ignore
    set category(value: RecipientCategory.COMPANY) {
        this.set('category', value)
    }
    set chamberOfCommerce(value: string) {
        this.set('chamberOfCommerce', value)
    }
    set companyName(value: string) {
        this.set('companyName', value)
    }
    set culture(value: string) {
        this.set('culture', value)
    }
    set vatApplicable(value: boolean) {
        this.set('vatApplicable', value)
    }
    set vatNumber(value: string) {
        this.set('vatNumber', value)
    }
}