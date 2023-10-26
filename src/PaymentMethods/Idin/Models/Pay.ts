import { ServiceParameter } from '../../../Models/ServiceParameters';

export interface IPay {
    issuer?: string;
}

export class Pay extends ServiceParameter {
    set issuer(value: string) {
        this.set('issuerID', value);
    }
}
