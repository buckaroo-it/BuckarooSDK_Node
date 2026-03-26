const buckarooClient = require('../buckarooClient');

const banking = buckarooClient.method('banking');

// PaymentOrder
banking
    .paymentOrder({
        amountCredit: 150.0,
        invoice: `Banking_Test_${Date.now()}`,
        description: 'Banking PaymentOrder Test',
        accountHolderName: 'John Doe',
        iban: 'NL44RABO0123456789',
        processingDate: '12/12/2026',
        bic: 'PAYMINBBXXX',
        purpose: 'Testing',
        structuredIssuerType: 'ISO',
        structuredReference: 'RF18539007547034',
    })
    .request();

// InstantPaymentOrder
banking
    .instantPaymentOrder({
        amountCredit: 100.0,
        invoice: `Banking_Instant_Test_${Date.now()}`,
        description: 'Banking InstantPaymentOrder Test',
        accountHolderName: 'John Doe',
        iban: 'NL44RABO0123456789',
    })
    .request();