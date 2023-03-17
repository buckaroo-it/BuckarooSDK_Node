import { IServiceList } from './ServiceList'
import { AdditionalParameter } from './ITransaction'
import ResponseStatus from '../Constants/ResponseStatus'
import {ServiceObject} from "./ServiceObject";

export declare interface ITransactionResponse {
    key: string
    status: {
        code: {
            code: number | string
            description: string
        }
        subCode: {
            code: number | string
            description: string
        }
        dateTime: string
    }
    requiredAction: {
        redirectURL: string
        requestedInformation: {
            name: string
            dataType: number
            maxLength: number
            required: boolean
            description: string
        }[]
        payRemainderDetails: {
            remainderAmount: number
            currency: string
            groupTransaction: string
        }
        name: string
        typeDeprecated: number
    }
    services: IServiceList[]
    customParameters: {
        list: AdditionalParameter[]
    }
    additionalParameters: {
        additionalParameter: AdditionalParameter[]
    }
    requestErrors: {
        channelErrors: {
            service: string
            action: string
            name: string
            error: string
            errorMessage: string
        }[]
        serviceErrors: {
            name: string
            error: string
            errorMessage: string
        }[]
        actionErrors: {
            service: string
            name: string
            error: string
            errorMessage: string
        }[]
        parameterErrors: {
            service: string
            action: string
            name: string
            error: string
            errorMessage: string
        }[]
        customParameterErrors: {
            name: string
            error: string
            errorMessage: string
        }[]
    }
    invoice: string
    serviceCode: string
    isTest: boolean
    currency: string
    amountDebit: number
    amountCredit: number
    transactionType: string
    mutationType: number
    relatedTransactions: {
        relationType: string
        relatedTransactionKey: string
    }[]
    consumerMessage: {
        mustRead: boolean
        cultureName: string
        title: string
        plainText: string
        htmlText: string
    }
    order: string
    issuingCountry: string
    startRecurrent: boolean
    recurring: boolean
    customerName: string
    payerHash: string
    paymentKey: string
}
export class TransactionService extends ServiceObject implements Partial<ITransactionResponse> {
    key?: string
    additionalParameters?: { additionalParameter: AdditionalParameter[] }
    amountCredit?: number
    amountDebit?: number
    consumerMessage?: {
        mustRead: boolean
        cultureName: string
        title: string
        plainText: string
        htmlText: string
    }
    currency?: string
    customParameters?: { list: AdditionalParameter[] }
    customerName?: string
    invoice?: string
    isTest?: boolean
    issuingCountry?: string
    mutationType?: number
    order?: string
    payerHash?: string
    paymentKey?: string
    recurring?: boolean
    relatedTransactions?: { relationType: string; relatedTransactionKey: string }[]
    requestErrors?: {
        channelErrors: {
            service: string
            action: string
            name: string
            error: string
            errorMessage: string
        }[]
        serviceErrors: { name: string; error: string; errorMessage: string }[]
        actionErrors: { service: string; name: string; error: string; errorMessage: string }[]
        parameterErrors: {
            service: string
            action: string
            name: string
            error: string
            errorMessage: string
        }[]
        customParameterErrors: { name: string; error: string; errorMessage: string }[]
    }
    requiredAction?: {
        redirectURL: string
        requestedInformation: {
            name: string
            dataType: number
            maxLength: number
            required: boolean
            description: string
        }[]
        payRemainderDetails: { remainderAmount: number; currency: string; groupTransaction: string }
        name: string
        typeDeprecated: number
    }
    serviceCode?: string
    services?: IServiceList[]
    startRecurrent?: boolean
    status?: {
        code: { code: number | string; description: string }
        subCode: { code: number | string; description: string }
        dateTime: string
    }
    transactionType?: string

    constructor(data: ITransactionResponse) {
        super(data)
    }
}
export class TransactionResponse extends TransactionService {
    constructor(data: ITransactionResponse) {
        super(data)
    }
    getStatusCode() {
        return this.findParameter('code')?.find('code')
    }
    getSubStatusCode() {
        return this.findParameter('subCode')?.find('code')
    }
    isSuccess() {
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_SUCCESS
    }
    isFailed() {
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_FAILED
    }
    isCanceled() {
        return (
            this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_CANCELLED_BY_USER ||
            this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_CANCELLED_BY_MERCHANT
        )
    }
    isAwaitingConsumer() {
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_WAITING_ON_CONSUMER
    }
    isPendingProcessing() {
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_PENDING_PROCESSING
    }
    isWaitingOnUserInput() {
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_WAITING_ON_USER_INPUT
    }
    isRejected() {
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_REJECTED
    }
    isValidationFailure() {
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_VALIDATION_FAILURE
    }
    hasRedirect() {
        return this.find('redirectURL') && this.find('requiredAction')?.find('name') === 'Redirect'
    }
    getRedirectUrl() {
        return this.hasRedirect() ? this.find('redirectURL') : ''
    }
    getServices() {
        return this.find('services')
    }
    getMethod() {
        return this.getServices()?.[0].name
    }
    getServiceAction() {
        return this.getServices()?.[0].action
    }
    getServiceParameters() {
        let parameters = this.getServices()?.[0].parameters
        let data = {}
        if (parameters)
            for (const key of parameters) {
                data[parameters[key].name] = parameters[parameters[key].value]
            }
        return data
    }
    getCustomParameters() {
        let customParameters = this.customParameters?.list
        if (customParameters) {
            let data = {}
            for (const param in customParameters) {
                data[customParameters[param].name] = customParameters[param].value
            }
            return data
        }
        return {}
    }
    getAdditionalParameters() {
        let additionalParameters = this.additionalParameters?.additionalParameter
        if (additionalParameters) {
            let data = {}
            for (const param in additionalParameters) {
                data[additionalParameters[param].name] = additionalParameters[param].value
            }
            return data
        }
        return {}
    }
    getTransactionKey() {
        return this.key
    }
    getPaymentKey() {
        return this.paymentKey
    }
    hasError() {
        return Object.keys(this.findParameter('RequestErrors') || {}).length > 0
    }
    find(parameter: string) {
        return super.find(parameter)
    }
}
