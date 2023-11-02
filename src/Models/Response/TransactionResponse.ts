import { ResponseStatus } from '../../Constants';
import { DataFormatter } from '../../Utils';
import { HttpClientResponse } from './HttpClientResponse';

import { IFormattedParameter } from '../IParameters';

export class TransactionResponse extends HttpClientResponse {
    get data(): ITransactionResponse {
        return this._data as any;
    }

    getStatusCode() {
        return this.data.status.code.code.toString();
    }

    getSubStatusCode() {
        return this.data.status.subCode.code.toString();
    }

    isSuccess() {
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_SUCCESS;
    }

    isFailed() {
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_FAILED;
    }

    isCanceled() {
        return (
            this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_CANCELLED_BY_USER ||
            this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_CANCELLED_BY_MERCHANT
        );
    }

    isAwaitingConsumer() {
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_WAITING_ON_CONSUMER;
    }

    isPendingProcessing() {
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_PENDING_PROCESSING;
    }

    isWaitingOnUserInput() {
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_WAITING_ON_USER_INPUT;
    }

    isRejected() {
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_REJECTED;
    }

    isValidationFailure() {
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_VALIDATION_FAILURE;
    }

    hasRedirect() {
        return this.data.requiredAction?.redirectURL.length > 0 && this.data.requiredAction?.name === 'Redirect';
    }

    getRedirectUrl() {
        if (this.hasRedirect()) return this.data.requiredAction?.redirectURL;
        return '';
    }

    getServices() {
        return this.data.services;
    }

    getMethod() {
        return this.data.services?.[0].name;
    }

    getServiceAction() {
        return this.data.services?.[0].action;
    }

    getCustomParameters() {
        return DataFormatter.parametersReverseMap(this.data.customParameters?.list ?? []);
    }

    getAdditionalParameters() {
        return DataFormatter.parametersReverseMap(
            this.data.additionalParameters?.additionalParameter ??
                (this.data.additionalParameters as Record<string, any>)?.['list'] ??
                []
        );
    }

    getTransactionKey() {
        return this.data.key;
    }

    getPaymentKey() {
        return this.data.paymentKey;
    }

    getAmountDebit() {
        return this.data.amountDebit;
    }

    getAmountCredit() {
        return this.data.amountCredit;
    }

    hasError() {
        return (
            this.data.requestErrors &&
            Object.keys(this.data.requestErrors).length > 0 &&
            (this.data.requestErrors.channelErrors.length > 0 ||
                this.data.requestErrors.serviceErrors.length > 0 ||
                this.data.requestErrors.actionErrors.length > 0 ||
                this.data.requestErrors.parameterErrors.length > 0 ||
                this.data.requestErrors.customParameterErrors.length > 0)
        );
    }

    getErrorMessage() {
        return this.data.status.code.description;
    }
}

export declare interface ITransactionResponse {
    key: string;
    name: string;
    version: number;
    description: string;
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
    services: {
        action: string;
        name: string;
        value: string;
        versionAsProperty: number;
        parameters: IFormattedParameter[];
    }[];
    customParameters?: {
        list: IFormattedParameter[];
    };
    additionalParameters?: {
        additionalParameter: IFormattedParameter[];
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
