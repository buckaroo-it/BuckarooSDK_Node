import { ModelStrategy } from '../../../Utils/ModelStrategy'
import { Invoice } from './Invoice'
import { AddOrUpdateProductLines } from './AddOrUpdateProductLines'
import { Debtor } from './Debtor'
import { IMultiInfoInvoice } from './multiInfoInvoice'

type CreditModels = AddOrUpdateProductLines & Debtor & Invoice & IMultiInfoInvoice
export class CreditManagementModelStrategy extends ModelStrategy<CreditModels> {
    constructor(data) {
        super(data)
        this.groupTypes = {
            address: 'Address',
            company: 'Company',
            person: 'Person',
            debtor: 'Debtor',
            phone: 'Phone',
            email: 'Email',
            articles: 'ProductLine',
            addressUnreachable: 'Address',
            emailUnreachable: 'Email',
            mobileUnreachable: 'Phone',
            landlineUnreachable: 'Phone',
            faxUnreachable: 'Phone'
        }
        this.keys = {
            articles: {
                identifier: 'ProductId',
                description: 'ProductName',
                price: 'PricePerUnit'
            },
            address: {
                houseNumberAdditional: 'HouseNumberSuffix'
            }
            // debtor: {
            //     code: 'debtorCode'
            // }
        }
        this.countable = ['articles', 'invoices']
    }
}
