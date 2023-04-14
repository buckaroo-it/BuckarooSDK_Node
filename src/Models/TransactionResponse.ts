import ResponseStatus from '../Constants/ResponseStatus'
import { ITransactionResponse } from './Services/ITransactionResponse'
import { firstLowerCase } from '../Utils/Functions'
import { Response } from '../Request/Response'
import { AxiosResponse } from 'axios'

export class TransactionResponse extends Response {
    get data(): ITransactionResponse {
        return this._data
    }
    constructor(response: AxiosResponse) {
        super(response)
    }
    getStatusCode() {
        return this.data.Status.Code.Code.toString()
    }
    getSubStatusCode() {
        return this.data.Status.SubCode.Code.toString()
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
            this.data.RequiredAction?.RedirectURL.length > 0 &&
            this.data.RequiredAction?.Name === 'Redirect'
        )
    }
    getRedirectUrl() {
        if (this.hasRedirect()) return this.data.RequiredAction?.RedirectURL
        return ''
    }
    getServices() {
        return this.data.Services
    }
    getMethod() {
        return this.data.Services?.[0].Name
    }
    getServiceAction() {
        return this.data.Services?.[0].Action
    }
    getServiceParameters() {
        let parameters = this.data.Services?.[0].Parameters
        let data: { [key: string]: any } = {}
        if (parameters) {
            parameters.forEach((param) => {
                let current = param

                if (param.GroupType) {
                    data[firstLowerCase(param.GroupType)] =
                        data[firstLowerCase(param.GroupType)] || {}
                    data[firstLowerCase(param.GroupType)][firstLowerCase(param.Name)] = param.Value
                } else {
                    data[firstLowerCase(current.Name)] = current.Value
                }
            })
            return data
        }
    }
    getCustomParameters() {
        let customParameters = this.data.CustomParameters?.List
        let data: { [key: string]: any } = {}
        if (customParameters) {
            customParameters.forEach((param) => {
                data[param.Name] = param.Value
            })
        }
        return data
    }
    getAdditionalParameters() {
        let additionalParameters = this.data.AdditionalParameters?.AdditionalParameter
        let data: { [key: string]: any } = {}
        if (additionalParameters) {
            additionalParameters.forEach((param) => {
                data[param.Name] = param.Value
            })
        }
        return {}
    }
    getTransactionKey() {
        return this.data.Key
    }
    getPaymentKey() {
        return this.data.PaymentKey
    }
    hasError() {
        return (
            this.data.RequestErrors &&
            Object.keys(this.data.RequestErrors).length > 0 &&
            (this.data.RequestErrors.ChannelErrors.length > 0 ||
                this.data.RequestErrors.ServiceErrors.length > 0 ||
                this.data.RequestErrors.ActionErrors.length > 0 ||
                this.data.RequestErrors.ParameterErrors.length > 0 ||
                this.data.RequestErrors.CustomParameterErrors.length > 0)
        )
    }
    getErrorMessages() {
        const messages: { [errorType: string]: string } = {}
        for (const [key, value] of Object.entries(this.data.RequestErrors)) {
            if (value.length > 0) {
                messages[key] = value.map((error) => error.ErrorMessage).join('')
            }
        }
        return Object.entries(messages)
    }
    getErrorMessage() {
        return this.data.Status.Code.Description
    }
}
