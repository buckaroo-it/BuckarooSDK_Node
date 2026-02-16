import { Model } from '../../../Models';

export interface IShippingInfo {
    company?: string;
    trackingNumber?: string;
    shippingMethod?: string;
}

export class ShippingInfo extends Model implements IShippingInfo {
    set company(value: string) {
        this.set('company', value);
    }

    set trackingNumber(value: string) {
        this.set('trackingNumber', value);
    }

    set shippingMethod(value: string) {
        this.set('shippingMethod', value);
    }
}
