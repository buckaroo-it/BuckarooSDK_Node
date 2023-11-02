import { IRequest, ServiceParameter } from '../../../Models';

export interface IGenerate extends IRequest {
    amount: number;
    amountIsChangeable: boolean;
    purchaseId: string;
    description: string;
    isOneOff: boolean;
    expiration: string;
    isProcessing?: boolean;
    minAmount: number;
    maxAmount: number;
    imageSize: number;
}

export class Generate extends ServiceParameter implements IGenerate {
    set amount(value: number) {
        this.set('amount', value);
    }

    set amountIsChangeable(value: boolean) {
        this.set('amountIsChangeable', value);
    }

    set purchaseId(value: string) {
        this.set('purchaseId', value);
    }

    set description(value: string) {
        this.set('description', value);
    }

    set isOneOff(value: boolean) {
        this.set('isOneOff', value);
    }

    set expiration(value: string) {
        this.set('expiration', value);
    }

    set isProcessing(value: boolean) {
        this.set('isProcessing', value);
    }

    set minAmount(value: number) {
        this.set('minAmount', value);
    }

    set maxAmount(value: number) {
        this.set('maxAmount', value);
    }

    set imageSize(value: number) {
        this.set('imageSize', value);
    }
}
