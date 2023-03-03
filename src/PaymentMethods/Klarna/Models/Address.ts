export interface IAddress {
    country: string
    street: string
    houseNumber: string
    houseNumberAdditional?: string
    zipcode: string
    city: string
}
export default class Address {
    country: string
    street: string
    streetNumber: string
    streetNumberAdditional?: string
    postalCode: string
    city: string

    constructor(data: IAddress) {
        this.city = data.city
        this.country = data.city
        this.street = data.street
        this.streetNumber = data.houseNumber
        this.streetNumberAdditional = data.houseNumberAdditional
        this.postalCode = data.zipcode
    }
}
