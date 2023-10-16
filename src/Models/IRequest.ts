import { ServiceCode } from '../Utils/MethodTypes';
import { IAdditionalParameters } from './IParameters';

export default interface IRequest {
    clientIP?: string;
    currency?: string;
    clientUserAgent?: string;
    returnURL?: string;
    returnURLError?: string;
    returnURLCancel?: string;
    returnURLReject?: string;
    pushURL?: string;
    pushURLFailure?: string;
    invoice?: string;
    order?: string;
    amountDebit?: number;
    amountCredit?: number;
    description?: string;
    originalTransactionKey?: string;
    originalTransactionReference?: {
        type: string;
        reference: string;
    };
    culture?: string;
    startRecurrent?: boolean;
    continueOnIncomplete?: boolean;
    servicesSelectableByClient?: ServiceCode[] | string;
    servicesExcludedForClient?: ServiceCode[] | string;
    customParameters?: IAdditionalParameters;
    additionalParameters?: IAdditionalParameters;

    [key: string]: any;
}

export declare interface IPaymentRequest extends IRequest {
    amountDebit: number;
    amountCredit?: never;
}

export declare interface IRefundRequest extends IRequest {
    amountCredit: number;
    amountDebit?: never;
    originalTransactionKey: string;
}
