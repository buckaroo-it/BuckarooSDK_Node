import { ServiceList } from './ServiceList'
import { AdditionalParameter } from './Payload'

export declare interface TransactionResponse {
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
    Services: ServiceList[]
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
