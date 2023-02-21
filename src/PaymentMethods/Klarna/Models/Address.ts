import Model from '../../../Models/Model'

export interface IAddress {
    country: string
    street: string
    houseNumber: string
    houseNumberAdditional?: string
    zipcode: string
    city: string
}
export default class Address extends Model implements IAddress {
    country: string = ''
    street: string = ''
    houseNumber: string = ''
    houseNumberAdditional?: string
    zipcode: string = ''
    city: string = ''

    constructor(data) {
        super()
        this.setParameters(data)
        this.setKeys({
            houseNumber: 'StreetNumber',
            houseNumberAdditional: 'StreetNumberAdditional',
            zipcode: 'PostalCode'
        })
    }
}
