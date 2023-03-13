import IPhone from '../../../Models/Services/IPhone'
import IPerson from '../../../Models/Services/IPerson'
import IAddress from '../../../Models/Services/IAddress'
import ICompany from '../../../Models/Services/ICompany'

export declare interface IBillingRecipient {
    recipient: Required<IPerson | ICompany>
    address: Required<IAddress>
    email: string
    phone: Required<IPhone>
}
