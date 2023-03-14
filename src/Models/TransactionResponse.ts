import { IServiceList } from './ServiceList'
import { AdditionalParameter } from './ITransaction'
import ResponseStatus from "../Constants/ResponseStatus";
import {ServiceParameters} from "../Utils/ServiceParameter";

export declare interface ITransactionResponse {
    Key: string
    Status: {
        Code: {
            Code: number | string
            Description: string
        }
        SubCode: {
            Code: number | string
            Description: string
        }
        DateTime: string
    }
    RequiredAction: {
        RedirectURL: string
        RequestedInformation: {
            Name: string
            DataType: number
            MaxLength: number
            Required: boolean
            Description: string
        }[]
        PayRemainderDetails: {
            RemainderAmount: number
            Currency: string
            GroupTransaction: string
        }
        Name: string
        TypeDeprecated: number
    }
    Services: IServiceList[]
    CustomParameters: {
        List: AdditionalParameter[]
    }
    AdditionalParameters: {
        AdditionalParameter: AdditionalParameter[]
    }
    RequestErrors: {
        ChannelErrors: {
            Service: string
            Action: string
            Name: string
            Error: string
            ErrorMessage: string
        }[]
        ServiceErrors: {
            Name: string
            Error: string
            ErrorMessage: string
        }[]
        ActionErrors: {
            Service: string
            Name: string
            Error: string
            ErrorMessage: string
        }[]
        ParameterErrors: {
            Service: string
            Action: string
            Name: string
            Error: string
            ErrorMessage: string
        }[]
        CustomParameterErrors: {
            Name: string
            Error: string
            ErrorMessage: string
        }[]
    }
    Invoice: string
    ServiceCode: string
    IsTest: boolean
    Currency: string
    AmountDebit: number
    AmountCredit: number
    TransactionType: string
    MutationType: number
    RelatedTransactions: {
        RelationType: string
        RelatedTransactionKey: string
    }[]
    ConsumerMessage: {
        MustRead: boolean
        CultureName: string
        Title: string
        PlainText: string
        HtmlText: string
    }
    Order: string
    IssuingCountry: string
    StartRecurrent: boolean
    Recurring: boolean
    CustomerName: string
    PayerHash: string
    PaymentKey: string
}

export class TransactionResponse implements TransactionResponse{
    data : ITransactionResponse
    constructor(data: ITransactionResponse) {
        this.data = data
    }
    getStatusCode() {
        return this.data.Status.Code.Code
    }
    getSubStatusCode() {
        return this.data.Status.SubCode.Code
    }
    isSuccess(){
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_SUCCESS
    }
    isFailed(){
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_FAILED
    }
    isCanceled(){
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_CANCELLED_BY_USER ||
            this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_CANCELLED_BY_MERCHANT
    }
    isAwaitingConsumer(){
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_WAITING_ON_CONSUMER
    }
    isPendingProcessing(){
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_PENDING_PROCESSING
    }
    isWaitingOnUserInput(){
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_WAITING_ON_USER_INPUT
    }
    isRejected(){
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_REJECTED
    }
    isValidationFailure(){
        return this.getStatusCode() === ResponseStatus.BUCKAROO_STATUSCODE_VALIDATION_FAILURE
    }
    hasRedirect(){
        return this.data.RequiredAction.RedirectURL &&
            this.data.RequiredAction.Name === 'Redirect'
    }
    getRedirectUrl(){
        return this.hasRedirect() ? this.data.RequiredAction.RedirectURL : ''
    }
    getMethod(){
        return this.data.Services[0].name
    }
    getServiceAction(){
        return this.data.Services[0].action
    }
    getServiceParameters(){
        let parameters = this.data.Services[0].parameters
        let data = {}
        if (parameters)
            for (const key of parameters) {
                data[key.Name.charAt(0).toLowerCase() + key.Name.slice(1)] = parameters[key.Value]
            }
        return data
    }
    getCustomParameters(){
        if (this.data.CustomParameters.List){
            let data = {}
            for (const param of this.data.CustomParameters.List) {
                data[param.Name] = param.Value
            }
            return data
        }
        return {}
    }
    getAdditionalParameters(){
        if (this.data.AdditionalParameters.AdditionalParameter){
            let data = {}
            for (const param of this.data.AdditionalParameters.AdditionalParameter) {
                data[param.Name] = param.Value
            }
            return data
        }
        return {}
    }
    getTransactionKey(){
        return this.data.Key
    }
    getPaymentKey(){
        return this.data.PaymentKey
    }
    hasError(){
        return this.data.RequestErrors && (
            this.data.RequestErrors.ChannelErrors.length > 0 ||
            this.data.RequestErrors.ServiceErrors.length > 0 ||
            this.data.RequestErrors.ActionErrors.length > 0 ||
            this.data.RequestErrors.ParameterErrors.length > 0 ||
            this.data.RequestErrors.CustomParameterErrors.length > 0
        );
    }
    find(parameter){
        let data =  new ServiceParameters(this.data)
        let params = data.findParameter(parameter)
        return params? params[parameter] : params
    }
}