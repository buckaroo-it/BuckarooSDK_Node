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
export class TransactionResponse{
    data : ServiceParameters
    constructor(data: ITransactionResponse) {
        this.data = new ServiceParameters(data)
    }
    getStatusCode() {
        return this.data.findParameter('code')
            ?.find('code')
    }
    getSubStatusCode() {
        return this.data.findParameter('SubCode')
            ?.find('code')
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
        return this.find('RedirectURL') &&
            this.find('RequiredAction')?.find('name') === 'Redirect'
    }
    getRedirectUrl(){
        return this.hasRedirect()? this.find('RedirectURL') : ''
    }
    getServices(){
        return this.find('services')
    }
    getMethod(){
        return this.getServices()?.[0].name
    }
    getServiceAction(){
        return this.getServices()?.[0].action
    }
    getServiceParameters(){
        let parameters = this.getServices()?.[0].parameters
        let data = {}
        if (parameters)
            for (const key of parameters) {
                data[key.name.charAt(0).toLowerCase() + key.name.slice(1)] = parameters[key.value]
            }
        return data
    }
    getCustomParameters(){
        let CustomParameters = this.find('CustomParameters')
        if (CustomParameters?.list){
            let data = {}
            for (const param of CustomParameters.list) {
                data[param.name] = param.value
            }
            return data
        }
        return {}
    }
    getAdditionalParameters(){
        let AdditionalParameters = this.find('AdditionalParameters')
        if (AdditionalParameters?.AdditionalParameter){
            let data = {}
            for (const param of AdditionalParameters.AdditionalParameter) {
                data[param.name] = param.value
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
        return this.data.findParameter('RequestErrors')
    }
    find(parameter:string){
        return this.data.findParameter(parameter)
    }
}