import IAddress from '../../../Models/Services/IAddress'

export interface IKlarnaAddress extends IAddress {
    country: string
    street: string
    houseNumber: Number | string
    houseNumberAdditional?: string
    zipcode: string
    city: string
}
