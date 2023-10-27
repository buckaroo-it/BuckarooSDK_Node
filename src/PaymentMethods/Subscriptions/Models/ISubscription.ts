import IPhone, { Phone } from '../../../Models/Interfaces/IPhone';
import IAddress, { Address } from '../../../Models/Interfaces/IAddress';
import { IRatePlan, IRatePlans, RatePlan } from './RatePlan';
import { IRatePlanCharge, IRatePlanCharges, RatePlanCharge } from './RatePlanCharge';
import { Configuration, IConfiguration } from './Configuration';
import IRequest from '../../../Models/IRequest';
import { ServiceParameter } from '../../../Models/ServiceParameters';
import { ICompany, IPerson, Person } from '../../../Models/Interfaces/IRecipient';
import Company from './Company';
import IDebtor from '../../../Models/Interfaces/IDebtor';
import IBankAccount, { BankAccount } from '../../../Models/Interfaces/IBankAccount';

export interface ISubscription extends IRequest {
    address?: Partial<IAddress>;
    allowedServices?: string;
    b2b?: string;
    billingTiming?: number;
    company?: Partial<ICompany>;
    configuration?: IConfiguration;
    configurationCode?: string;
    customerAccountName?: string;
    customerBIC?: string;
    customerIBAN?: string;
    debtor?: IDebtor;
    email?: string;
    includeTransaction?: boolean;
    mandateReference?: string;
    person?: Partial<IPerson>;
    phone?: Partial<IPhone>;
    subscriptionGuid?: string;
    termStartDay?: number;
    termStartMonth?: number;
    termStartWeek?: string;
    transactionVatPercentage?: number;
    ratePlans?: IRatePlans;
    ratePlanCharges?: IRatePlanCharges;
    bankAccount?: IBankAccount;
}

export class Subscription extends ServiceParameter implements ISubscription {
    set configurationCode(configurationCode: string) {
        this.set('configurationCode', configurationCode);
    }

    set includeTransaction(includeTransaction: boolean) {
        this.set('includeTransaction', includeTransaction);
    }

    set transactionVatPercentage(transactionVatPercentage: number) {
        this.set('transactionVatPercentage', transactionVatPercentage);
    }

    set subscriptionGuid(value: string) {
        this.set('subscriptionGuid', value);
    }

    set termStartDay(value: number) {
        this.set('termStartDay', value);
    }

    set termStartMonth(value: number) {
        this.set('termStartMonth', value);
    }

    set billingTiming(value: number) {
        this.set('billingTiming', value);
    }

    set termStartWeek(value: string) {
        this.set('termStartWeek', value);
    }

    set b2b(value: string) {
        this.set('b2b', value);
    }

    set mandateReference(value: string) {
        this.set('mandateReference', value);
    }

    set allowedServices(value: string) {
        this.set('allowedServices', value);
    }

    set debtor(value: IDebtor) {
        this.set('debtor', value);
    }

    set bankAccount(value: IBankAccount) {
        this.set('bankAccount', new BankAccount(value));
    }

    set email(value: string) {
        this.set('email', value);
    }

    set phone(value: IPhone) {
        this.set('phone', new Phone(value));
    }

    set address(value: IAddress) {
        this.set('address', new Address(value));
    }

    set person(value: IPerson) {
        this.set('person', new Person(value));
    }

    set company(value: ICompany) {
        this.set('company', new Company(value));
    }

    set configuration(value: Configuration) {
        this.set('configuration', new Configuration(value));
    }

    set ratePlans(value: IRatePlans) {
        Object.entries(value).forEach(([key, val]) => {
            if (this.has(key + 'RatePlan')) {
                this.set(key + 'RatePlan', val);
            }
        });
    }

    set ratePlanCharges(value: IRatePlanCharges) {
        Object.entries(value).forEach(([key, val]) => {
            if (this.has(key + 'RatePlanCharge')) {
                this.set(key + 'RatePlanCharge', val);
            }
        });
    }

    set customerIBAN(value: string) {
        this.set('customerIBAN', value);
    }

    set customerAccountName(value: string) {
        this.set('customerAccountName', value);
    }

    set customerBIC(value: string) {
        this.set('customerBIC', value);
    }

    protected set addRatePlan(value: IRatePlan) {
        this.set('addRatePlan', new RatePlan(value));
    }

    protected set updateRatePlan(value: IRatePlan) {
        this.set('updateRatePlan', new RatePlan(value));
    }

    protected set disableRatePlan(value: IRatePlan) {
        this.set('disableRatePlan', new RatePlan(value));
    }

    protected set addRatePlanCharge(value: IRatePlanCharge) {
        this.set('addRatePlanCharge', new RatePlanCharge(value));
    }

    getGroups() {
        return super.getGroups({
            Debtor: 'Debtor',
            Person: 'Person',
            Email: 'Email',
            Address: 'Address',
            AddRatePlan: 'AddRatePlan',
            Configuration: 'AddConfiguration',
            UpdateRatePlan: 'UpdateRatePlan',
            DisableRatePlan: 'DisableRatePlan',
            AddRatePlanCharge: 'AddRatePlanCharge',
            UpdateRatePlanCharge: 'UpdateRatePlanCharge',
            DisableRatePlanCharge: 'DisableRatePlanCharge',
        });
    }
}
