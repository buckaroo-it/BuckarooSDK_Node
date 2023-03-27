import { ClientIP, Payload } from '../../../Models/ITransaction'
import IArticle from '../../../Models/Services/IArticle'
import { ServiceParameters } from '../../../Utils/ServiceParameters'
import IPhone from '../../../Models/Services/IPhone'
import ICompany from '../../../Models/Services/ICompany'
import IPerson from '../../../Models/Services/IPerson'
import IAddress from '../../../Models/Services/IAddress'

export interface IPay extends Payload {
    description: string
    clientIP: ClientIP
    customerType: string
    invoiceDate: string
    email: string
    phone: Pick<IPhone, 'mobile' | 'fax'>
    company: ICompany
    customer: IPerson
    address: IAddress
    articles: Pick<IArticle, 'identifier' | 'description' | 'price' | 'quantity'>[]
    subTotals: { name: string; value: Number }[]
}
export const Pay = (data: IPay) => {
    return {
        customerType: data.customerType,
        invoiceDate: data.invoiceDate,
        email: new ServiceParameters({ email: data.email }).setGroupType('Email'),
        phone: new ServiceParameters(data.phone)
            .setGroupType('Phone')
            .setParameterKeys({ mobile: 'Phone' }),
        company: new ServiceParameters(data.company).setGroupType('Company').setParameterKeys({
            companyName: 'Name'
        }),
        customer: new ServiceParameters(data.customer).setGroupType('Person'),
        address: new ServiceParameters(data.address).setGroupType('Address').setParameterKeys({
            houseNumberAdditional: 'HouseNumberSuffix'
        }),
        articles: new ServiceParameters(data.articles)
            .setGroupType('ProductLine')
            .makeCountable()
            .setParameterKeys({
                identifier: 'Code',
                description: 'Name'
            }),
        subTotals: new ServiceParameters(data.subTotals)
            .setGroupType('SubtotalLine')
            .makeCountable()
    }
}
