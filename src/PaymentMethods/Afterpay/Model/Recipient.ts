import IPhone from '../../../Models/Services/IPhone'
import IPerson from '../../../Models/Services/IPerson'
import IAddress from '../../../Models/Services/IAddress'
import ICompany from '../../../Models/Services/ICompany'
import {ServiceParameters} from "../../../Utils/ServiceParameter";
import {ServiceModel} from "../../../Models/Adapters";

export declare interface IBillingRecipient {
    recipient: Required<IPerson | ICompany>
    address: Required<IAddress>
    email: string
    phone: Pick<IPhone,'mobile'>
}

export const recipient = (data) => {
    data.recipient = new ServiceParameters(data.recipient)
    if(data.phone){
        data.phone = phone(data.phone)
    }
    data.address = address(data.address)
    return data
}

export const address = (data:IAddress) => {
    return ServiceModel(data, {
        keys:{
            houseNumber:'streetNumber',
            houseNumberAdditional:'streetNumberAdditional',
            zipcode:'postalCode'
        }
    })
}
export const phone = (data:IPhone) => {
    let phoneData = ServiceModel(data, {
        keys:{
            mobile:'phone'
        }
    })
    phoneData.removeKeys(['landline','fax'])
    return phoneData
}
