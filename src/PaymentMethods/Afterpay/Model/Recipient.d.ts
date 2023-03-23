import IPhone from '../../../Models/Services/IPhone';
import IPerson from '../../../Models/Services/IPerson';
import IAddress from '../../../Models/Services/IAddress';
import ICompany from '../../../Models/Services/ICompany';
import { ServiceParameters } from '../../../Utils/ServiceParameter';
import RecipientCategory from '../../../Constants/RecipientCategory';
export declare interface Person extends IPerson {
    category: RecipientCategory;
    firstName: string;
    lastName: string;
    customerNumber?: string;
    identificationNumber?: string;
    conversationLanguage?: 'NL' | 'FR' | 'DE' | 'FI';
}
export declare interface IBillingRecipient {
    recipient: Person | ICompany;
    address: Omit<Required<IAddress>, 'state'>;
    email: string;
    phone: Pick<IPhone, 'mobile'>;
}
export declare interface IShippingRecipient {
    recipient: Person | ICompany;
    address: Omit<Required<IAddress>, 'state'>;
    email: string;
    phone?: Pick<IPhone, 'mobile'>;
}
export declare function adaptBilling(billing: ServiceParameters): ServiceParameters;
export declare function adaptShipping(shipping: ServiceParameters): ServiceParameters;
export declare const adaptRecipient: (recipient: ServiceParameters) => ServiceParameters;
export declare const adaptAddress: (address: ServiceParameters) => ServiceParameters;
export declare const adaptPhone: (phone?: ServiceParameters) => ServiceParameters | undefined;
