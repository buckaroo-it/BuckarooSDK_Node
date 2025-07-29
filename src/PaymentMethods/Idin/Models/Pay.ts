import { IAdditionalParameters, ServiceParameter } from '../../../Models';

export interface IPay {
    issuer?: string;
    additionalParameters?: IAdditionalParameters;
}

export class Pay extends ServiceParameter {
    set issuer(value: string) {
        this.set('issuerID', value);
    }

    set additionalParameters(value: IAdditionalParameters) {
        this.set('additionalParameters', value);
    }
}
