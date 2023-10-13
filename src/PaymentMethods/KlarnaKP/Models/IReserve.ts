import Gender from '../../../Constants/Gender';
import IRequest from '../../../Models/IRequest';
import { ICustomer } from '../../../Models/Interfaces/ICustomer';
import IArticle from '../../../Models/Interfaces/IArticle';
import { ServiceParameter } from '../../../Models/ServiceParameters';

export interface IReserve extends IRequest {
    gender?: Gender.MALE | Gender.FEMALE;
    billing?: ICustomer;
    shipping?: ICustomer;
    articles?: Partial<IArticle>[];
    operatingCountry?: string;
    reservationNumber?: string;
    shippingSameAsBilling?: boolean;
    pno?: string;
}
export class Reserve extends ServiceParameter implements IReserve {
    protected getCountable() {
        return super.getCountable(['Articles']);
    }
    set reservationNumber(value: string) {
        this.set('reservationNumber', value);
    }
    set gender(value: Gender.MALE | Gender.FEMALE) {
        this.set('gender', value);
    }
    set operatingCountry(value: string) {
        this.set('operatingCountry', value);
    }
    set pno(value: string) {
        this.set('pno', value);
    }
    set billing(value: ICustomer) {
        this.set('billing', value);
    }
    set shipping(value: ICustomer) {
        this.set('shipping', value);
    }
    set articles(value: IArticle[]) {
        this.set('articles', value);
    }
}
