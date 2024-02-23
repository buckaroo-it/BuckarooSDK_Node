import buckarooClient from '../buckarooClient';

const bancontact = buckarooClient.method('bancontactmrcash');

//Pay
bancontact
    .pay({
        amountDebit: 10.1,
        description: 'Bancontact Payment',
    })
    .request();
//Refund
bancontact
    .refund({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountCredit: 10.1,
        invoice: 'Bancontact Refund',
    })
    .request();
//Authenticate
bancontact
    .authenticate({
        invoice: 'BancontactAuthenticate',
        amountDebit: 10.1,
        description: 'Bancontact Authenticate',
    })
    .request();
//PayOneClick
bancontact
    .payOneClick({
        invoice: 'Bancontact PayOneClick',
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountDebit: 100,
    })
    .request();
//CompletePayment
bancontact
    .completePayment({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        encryptedCardData: 'XXXXXXXXXXXXXXXXXXXXXXXX',
    })
//PayEncrypted
bancontact
    .payEncrypted({
        amountDebit: 100,
        encryptedCardData: 'XXXXXXXXXXXXXXXXXXXXXXXX',
        invoice: 'Bancontact PayEncrypred',
    })
//PayRecurring
bancontact
    .payRecurring({
        amountDebit: 100,
        encryptedCardData: 'XXXXXXXXXXXXXXXXXXXXXXXX',
        invoice: 'Bancontact PayRecurring',
    })
