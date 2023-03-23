import { IServiceList } from './ServiceList';
import { AdditionalParameter } from './ITransaction';
import { ServiceObject } from './ServiceObject';
export declare interface ITransactionResponse {
    key: string;
    status: {
        code: {
            code: number | string;
            description: string;
        };
        subCode: {
            code: number | string;
            description: string;
        };
        dateTime: string;
    };
    requiredAction: {
        redirectURL: string;
        requestedInformation: {
            name: string;
            dataType: number;
            maxLength: number;
            required: boolean;
            description: string;
        }[];
        payRemainderDetails: {
            remainderAmount: number;
            currency: string;
            groupTransaction: string;
        };
        name: string;
        typeDeprecated: number;
    };
    services: IServiceList[];
    customParameters: {
        list: AdditionalParameter[];
    };
    additionalParameters: {
        additionalParameter: AdditionalParameter[];
    };
    requestErrors: {
        channelErrors: {
            service: string;
            action: string;
            name: string;
            error: string;
            errorMessage: string;
        }[];
        serviceErrors: {
            name: string;
            error: string;
            errorMessage: string;
        }[];
        actionErrors: {
            service: string;
            name: string;
            error: string;
            errorMessage: string;
        }[];
        parameterErrors: {
            service: string;
            action: string;
            name: string;
            error: string;
            errorMessage: string;
        }[];
        customParameterErrors: {
            name: string;
            error: string;
            errorMessage: string;
        }[];
    };
    invoice: string;
    serviceCode: string;
    isTest: boolean;
    currency: string;
    amountDebit: number;
    amountCredit: number;
    transactionType: string;
    mutationType: number;
    relatedTransactions: {
        relationType: string;
        relatedTransactionKey: string;
    }[];
    consumerMessage: {
        mustRead: boolean;
        cultureName: string;
        title: string;
        plainText: string;
        htmlText: string;
    };
    order: string;
    issuingCountry: string;
    startRecurrent: boolean;
    recurring: boolean;
    customerName: string;
    payerHash: string;
    paymentKey: string;
}
export declare class TransactionResponse extends ServiceObject implements Partial<ITransactionResponse> {
    key?: string;
    additionalParameters?: {
        additionalParameter: AdditionalParameter[];
    };
    amountCredit?: number;
    amountDebit?: number;
    consumerMessage?: {
        mustRead: boolean;
        cultureName: string;
        title: string;
        plainText: string;
        htmlText: string;
    };
    currency?: string;
    customParameters?: {
        list: AdditionalParameter[];
    };
    customerName?: string;
    invoice?: string;
    isTest?: boolean;
    issuingCountry?: string;
    mutationType?: number;
    order?: string;
    payerHash?: string;
    paymentKey?: string;
    recurring?: boolean;
    relatedTransactions?: {
        relationType: string;
        relatedTransactionKey: string;
    }[];
    requestErrors?: {
        channelErrors: {
            service: string;
            action: string;
            name: string;
            error: string;
            errorMessage: string;
        }[];
        serviceErrors: {
            name: string;
            error: string;
            errorMessage: string;
        }[];
        actionErrors: {
            service: string;
            name: string;
            error: string;
            errorMessage: string;
        }[];
        parameterErrors: {
            service: string;
            action: string;
            name: string;
            error: string;
            errorMessage: string;
        }[];
        customParameterErrors: {
            name: string;
            error: string;
            errorMessage: string;
        }[];
    };
    requiredAction?: {
        redirectURL: string;
        requestedInformation: {
            name: string;
            dataType: number;
            maxLength: number;
            required: boolean;
            description: string;
        }[];
        payRemainderDetails: {
            remainderAmount: number;
            currency: string;
            groupTransaction: string;
        };
        name: string;
        typeDeprecated: number;
    };
    serviceCode?: string;
    services?: IServiceList[];
    startRecurrent?: boolean;
    status?: {
        code: {
            code: number | string;
            description: string;
        };
        subCode: {
            code: number | string;
            description: string;
        };
        dateTime: string;
    };
    transactionType?: string;
    constructor(data: ITransactionResponse);
    getStatusCode(): any;
    getSubStatusCode(): any;
    isSuccess(): boolean;
    isFailed(): boolean;
    isCanceled(): boolean;
    isAwaitingConsumer(): boolean;
    isPendingProcessing(): boolean;
    isWaitingOnUserInput(): boolean;
    isRejected(): boolean;
    isValidationFailure(): boolean;
    hasRedirect(): any;
    getRedirectUrl(): any;
    getServices(): any;
    getMethod(): any;
    getServiceAction(): any;
    getServiceParameters(): {};
    getCustomParameters(): {};
    getAdditionalParameters(): {};
    getTransactionKey(): string | undefined;
    getPaymentKey(): string | undefined;
    hasError(): boolean;
    find(parameter: any): any;
}
