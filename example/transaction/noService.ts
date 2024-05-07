import buckarooClient from '../buckarooClient';
import { uniqid } from '../../src';

const noservice = buckarooClient.method('noservice');

//Pay
noservice
    .pay({
        amountDebit: 100,
        invoice: uniqid(),
        servicesSelectableByClient: 'ideal,bancontactmrcash,paypal',
        servicesExcludedForClient: 'ideal',
        continueOnIncomplete: true,
    })
    .request();
