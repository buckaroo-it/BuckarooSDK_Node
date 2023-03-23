import { ClientIP, Payload } from '../../../Models/ITransaction';
import IArticle from '../../../Models/Services/IArticle';
import { ServiceParameters } from '../../../Utils/ServiceParameter';
import IPhone from '../../../Models/Services/IPhone';
import ICompany from '../../../Models/Services/ICompany';
import IPerson from '../../../Models/Services/IPerson';
import IAddress from '../../../Models/Services/IAddress';
export interface IPay extends Payload {
    description: string;
    clientIP: ClientIP;
    customerType: string;
    invoiceDate: string;
    email: string;
    phone: Pick<IPhone, 'mobile' | 'fax'>;
    company: ICompany;
    customer: IPerson;
    address: IAddress;
    articles: Pick<IArticle, 'identifier' | 'description' | 'price' | 'quantity'>[];
    subTotals: {
        name: string;
        value: Number;
    }[];
}
export declare const Pay: (data: IPay) => {
    customerType: string;
    invoiceDate: string;
    email: ServiceParameters;
    phone: ServiceParameters;
    company: ServiceParameters;
    customer: ServiceParameters;
    address: ServiceParameters;
    articles: ServiceParameters;
    subTotals: ServiceParameters;
};
