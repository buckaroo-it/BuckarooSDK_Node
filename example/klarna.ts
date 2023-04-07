require('./BuckarooClient')
import Klarna from '../src/PaymentMethods/Klarna'

const klarna = new Klarna()
klarna
    .pay({
        additionalParameters: undefined,
        amountDebit: 0,
        articles: [],
        billingCustomer: undefined,
        clientIP: undefined,
        continueOnIncomplete: '',
        culture: '',
        currency: '',
        customParameters: undefined,
        description: '',
        invoice: '',
        order: '',
        originalTransactionKey: '',
        originalTransactionReference: '',
        pushURL: '',
        pushURLFailure: '',
        returnURL: '',
        returnURLCancel: '',
        returnURLError: '',
        returnURLReject: '',
        servicesExcludedForClient: '',
        servicesSelectableByClient: '',
        shippingCustomer: undefined,
        startRecurrent: false
    })
    .then((res) => {
        console.log(res)
    })
