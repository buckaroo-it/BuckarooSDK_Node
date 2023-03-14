import IPhone from '../../../Models/Services/IPhone'
import IPerson from '../../../Models/Services/IPerson'
import IAddress from '../../../Models/Services/IAddress'
import ICompany from '../../../Models/Services/ICompany'
import {ServiceParameters} from "../../../Utils/ServiceParameter";

export declare interface IBillingRecipient {
    recipient: Required<IPerson | ICompany>
    address: Required<IAddress>
    email: string
    phone: Pick<IPhone,'mobile'>
}

export const recipient = (data:IBillingRecipient) => {
    let recipientData = new ServiceParameters(data)
    if(data.phone){
        recipientData.phone = phone(data.phone)
    }
    recipientData.address = address(recipientData.address)
    return recipientData
}
export const address = (data:IAddress) => {
    let addressData = new ServiceParameters(data)
    addressData.setKeys({
        houseNumber:'streetNumber',
        houseNumberAdditional:'streetNumberAdditional',
        zipcode:'postalCode'
    })
    return addressData
}
export const phone = (data:IPhone) => {
    let phoneData = new ServiceParameters(data)
    phoneData.setKeys({
        mobile:'phone'
    })
    phoneData.removeKeys(['landline','fax'])
    return phoneData
}