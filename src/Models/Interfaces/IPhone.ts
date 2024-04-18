import { Model } from '../Model';

export default interface IPhone {
    landline?: string;
    mobile?: string;
    fax?: string;
}

export class Phone extends Model implements IPhone {
    set landline(landline: string) {
        this.set('landline', landline);
    }

    set mobile(mobile: string) {
        this.set('mobile', mobile);
    }

    set fax(fax: string) {
        this.set('fax', fax);
    }
}
