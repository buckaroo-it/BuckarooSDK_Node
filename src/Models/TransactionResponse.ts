import { IServiceList } from './ServiceList'
import ResponseStatus from '../Constants/ResponseStatus'
import {AdditionalParameterResponse, ITransactionResponse} from './Services/ITransactionResponse'
import {firstLowerCase, firstUpperCase} from "../Utils/Functions";

export class TransactionResponse implements ITransactionResponse {
    AdditionalParameters?: { AdditionalParameter: AdditionalParameterResponse[] }
    CustomParameters?: { List: AdditionalParameterResponse[] }
    AmountCredit: number
    AmountDebit: number
    ConsumerMessage: {
        MustRead: boolean
        CultureName: string
        Title: string
        PlainText: string
        HtmlText: string
    }
    Currency: string
    CustomerName: string
    Invoice: string
    IsTest: boolean
    IssuingCountry: string
    Key: string
    MutationType: number
    Order: string
    PayerHash: string
    PaymentKey: string
    Recurring: boolean
    RelatedTransactions: { RelationType: string; RelatedTransactionKey: string }[]
    RequestErrors: {
        ChannelErrors: {
            Service: string
            Action: string
            Name: string
            Error: string
            ErrorMessage: string
        }[]
        ServiceErrors: { Name: string; Error: string; ErrorMessage: string }[]
        ActionErrors: { Service: string; Name: string; Error: string; ErrorMessage: string }[]
        ParameterErrors: {
            Service: string
            Action: string
            Name: string
            Error: string
            ErrorMessage: string
        }[]
        CustomParameterErrors: { Name: string; Error: string; ErrorMessage: string }[]
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
    ServiceCode: string
    Services: IServiceList[]
    StartRecurrent: boolean
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
    TransactionType: string

    constructor(data: ITransactionResponse) {
        this.Key = data.Key
        this.Services = data.Services
        this.PaymentKey = data.PaymentKey
        this.PayerHash = data.PayerHash
        this.CustomerName = data.CustomerName
        this.Recurring = data.Recurring
        this.StartRecurrent = data.StartRecurrent
        this.CustomParameters = data.CustomParameters
        this.AdditionalParameters = data.AdditionalParameters
        this.RequestErrors = data.RequestErrors
        this.Invoice = data.Invoice
        this.ServiceCode = data.ServiceCode
        this.IsTest = data.IsTest
        this.Currency = data.Currency
        this.AmountDebit = data.AmountDebit
        this.AmountCredit = data.AmountCredit
        this.TransactionType = data.TransactionType
        this.MutationType = data.MutationType
        this.RelatedTransactions = data.RelatedTransactions
        this.ConsumerMessage = data.ConsumerMessage
        this.Order = data.Order
        this.IssuingCountry = data.IssuingCountry
        this.Status = data.Status
        this.RequiredAction = data.RequiredAction
    }
    getStatusCode() {
        return this.Status.Code.Code.toString()
    }
    getSubStatusCode() {
        return this.Status.SubCode.Code.toString()
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
        return (
            this.RequiredAction?.RedirectURL.length > 0 && this.RequiredAction?.Name === 'Redirect'
        )
    }
    getRedirectUrl() {
        if (this.hasRedirect()) return this.RequiredAction?.RedirectURL
        return ''
    }
    getServices() {
        return this.Services
    }
    getMethod() {
        return this.Services?.[0].Name
    }
    getServiceAction() {
        return this.Services?.[0].Action
    }
    getServiceParameters() {
        let parameters = this.getServices()?.[0].Parameters
        let data = {}
        if (parameters) {
            parameters.forEach((param) => {
                let current = param
                current.GroupType = firstLowerCase(param.GroupType)
                if (param.GroupType && param.GroupID) {
                    current = data[param.GroupType+'s'] = data[param.GroupType+'s'] || []
                    current = current[parseInt(<string>param.GroupID)-1] = current[parseInt(<string>param.GroupID)-1] || {[param.GroupType]:{}}
                    current = current[param.GroupType]

                    current[firstLowerCase(param.Name)] = param.Value
                }else if(param.GroupType){
                    current = data[param.GroupType] = data[param.GroupType] ?? {}
                    current[firstLowerCase(param.Name)] = param.Value
                }else if(param.GroupID){
                    data[param.Name] = data[param.Name] ?? []
                    data[param.Name].push(param.Value)
                }
            })
            return data
        }
    }
    getCustomParameters() {
        let customParameters = this.CustomParameters?.List
        let data = {}
        if (customParameters) {
            customParameters.forEach((param) => {
                data[param.Name] = param.Value
            })
        }
        return data
    }
    getAdditionalParameters() {
        let additionalParameters = this.AdditionalParameters?.AdditionalParameter
        let data = {}
        if (additionalParameters) {
            additionalParameters.forEach((param) => {
                data[param.Name] = param.Value
            })
        }
        return {}
    }
    getTransactionKey() {
        return this.Key
    }
    getPaymentKey() {
        return this.PaymentKey
    }
    hasError() {
        return (
            this.RequestErrors &&
            Object.keys(this.RequestErrors).length > 0 &&
            (this.RequestErrors.ChannelErrors.length > 0 ||
                this.RequestErrors.ServiceErrors.length > 0 ||
                this.RequestErrors.ActionErrors.length > 0 ||
                this.RequestErrors.ParameterErrors.length > 0 ||
                this.RequestErrors.CustomParameterErrors.length > 0)
        )
    }
    getErrorMessages() {
        const messages: { [errorType: string]: string } = {}
        Object.keys(this.RequestErrors).forEach((key) => {
            if (this.RequestErrors[key].length > 0) {
                messages[key] = this.RequestErrors[key].map((error) => error.ErrorMessage).join('')
            }
        })
        return Object.entries(messages)
    }
    getErrorMessage() {
        return this.Status.Code.Description
    }
}
