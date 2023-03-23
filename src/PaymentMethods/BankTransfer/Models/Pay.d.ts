import IPerson from '../../../Models/Services/IPerson';
import IEmail from '../../../Models/Services/IEmail';
import { ServiceParameters } from '../../../Utils/ServiceParameter';
export declare interface IPay {
    sendMail: boolean;
    dateDue: string;
    country: string;
    email: IEmail;
    customer: IPerson;
}
export declare const Pay: (data: any) => {
    sendMail: any;
    dateDue: any;
    customerCountry: any;
    email: any;
    customer: ServiceParameters;
};
