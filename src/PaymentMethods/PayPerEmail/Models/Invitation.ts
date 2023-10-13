import IRequest from '../../../Models/IRequest';
import { ServiceParameter } from '../../../Models/ServiceParameters';
import { Attachments, IAttachments } from './Attachments';
import { IPerson, Person } from '../../../Models/Interfaces/IRecipient';

export interface IInvitation extends IRequest {
    customer: Partial<IPerson>;
    email: string;
    merchantSendsEmail?: boolean;
    expirationDate?: string;
    paymentMethodsAllowed?: string;
    attachments?: IAttachments[];
    attachment?: string;
}
export class Invitation extends ServiceParameter {
    protected getCountable() {
        return super.getCountable(['Attachments']);
    }
    set attachment(value: string) {
        this.set('attachment', value);
    }
    set customer(value: Partial<IPerson>) {
        this.set('customer', new Customer(value));
    }
    set merchantSendsEmail(value: boolean) {
        this.set('merchantSendsEmail', value);
    }
    set attachments(value: IAttachments[]) {
        this.set(
            'attachments',
            value.map((attachment: IAttachments) => new Attachments(attachment))
        );
    }
    set email(value: string) {
        this.set('customerEmail', value);
    }
    set paymentMethodsAllowed(value: string) {
        this.set('paymentMethodsAllowed', value);
    }
    set expirationDate(value: string) {
        this.set('expirationDate', value);
    }
}
class Customer extends Person {
    set gender(value: string) {
        this.set('customergender', value);
    }
    set firstName(value: string) {
        this.set('customerFirstName', value);
    }
    set lastName(value: string) {
        this.set('customerLastName', value);
    }
}
