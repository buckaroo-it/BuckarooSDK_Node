import IAddress from '../../../Models/Services/IAddress'
import { Payload } from '../../../Models/ITransaction'

export type ExtraInfo = {
    customeraccountname: string
    customerBIC?: string
    customerIBAN: string
    collectDate: string
    mandateReference?: string
    mandateDate?: string
    customerName?: string
    customerCode?: string
    customerReferencePartyCode?: string
    customerReferencePartyName?: string
    houseNumberSuffix: string
    contractID: string
} & Omit<IAddress, 'houseNumberAdditional' | 'state'>

export type IExtraInfo = ExtraInfo & Payload
