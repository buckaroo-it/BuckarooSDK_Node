import IAddress, { Address } from '../../../Models/Interfaces/IAddress';
export class KlarnaAddress extends Address implements IAddress {
    get houseNumber(): string {
        return this.get('streetNumber');
    }
    set houseNumber(houseNumber: string) {
        this.set('streetNumber', houseNumber);
    }
    get houseNumberAdditional(): string {
        return this.get('streetNumberAdditional');
    }
    set houseNumberAdditional(houseNumberAdditional: string) {
        this.set('streetNumberAdditional', houseNumberAdditional);
    }
    get zipcode(): string {
        return this.get('postalCode');
    }
    set zipcode(zipcode: string) {
        this.set('postalCode', zipcode);
    }
}
