import { ClientIP, Payload } from '../../../Models/ITransaction'
import IArticle from '../../../Models/Services/IArticle'
import { ServiceParameters } from '../../../Utils/ServiceParameters'
import IPhone from '../../../Models/Services/IPhone'
import ICompany from '../../../Models/Services/ICompany'
import IPerson from '../../../Models/Services/IPerson'
import IAddress from '../../../Models/Services/IAddress'
import {ModelStrategy} from "../../../Utils/ModelStrategy";

interface Pay {
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

export interface IPay extends Payload,Pay {
    description: string
    clientIP: ClientIP
}

export class In3ModelStrategy extends ModelStrategy<Pay> {
    setData(data:Pay) {
        super.setData(data);
    }
    constructor(data) {
        super(data);
        this.groupTypes = {
            phone: 'Phone',
            email: 'Email',
            company: 'Company',
            customer: 'Person',
            address: 'Address',
            articles: 'ProductLine',
            subTotals: 'SubtotalLine'
        }
        this.keys = {
            articles:{
                identifier: 'Code',
                description: 'Name'
            },
            company:{
                companyName: 'Name'
            },
            address:{
              houseNumberAdditional:'HouseNumberSuffix'
            },
            phone:{
                mobile: 'Phone'
            }
        }
        this.countable = ['articles', 'subTotals']
    }
}