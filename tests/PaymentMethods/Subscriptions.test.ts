import { uniq } from 'lodash';
import { PaymentMethodInstance, uniqid } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';
import { formatDate, getServiceParameter } from '../Payloads';

let method: PaymentMethodInstance<'subscriptions'>;
let transactionKey: string;

beforeEach(() => {
    method = buckarooClientTest.method('subscriptions');
});

describe('Subscription methods', () => {
    test('Create', async () => {
        const response = await method
            .create({
                startDate: formatDate(new Date()),
                ratePlans: {
                    add: {
                        startDate: formatDate(new Date()),
                        billingTiming: 1,
                        ratePlanName: 'Test Rate Plan',
                        ratePlanDescription: 'This is a test rate plan',
                        currency: 'EUR',
                        billingInterval: 'Weekly',
                        termStartDay: 1,
                    },
                },
                ratePlanCharges: {
                    add: {
                        ratePlanChargeName: 'Rate Plan Charge',
                        ratePlanChargeDescription: 'This is a test rate plan charge',
                        unitOfMeasure: 'Quantity',
                        baseNumberOfUnits: 1,
                        partialBilling: 'Billfull',
                        pricePerUnit: 2,
                        priceIncludesVat: true,
                        vatPercentage: 21,
                        ratePlanChargeType: 'Recurring',
                    },
                },
                configurationCode: '1jg5ke6j',
                debtor: {
                    code: 'johnsmith4',
                },
            })
            .request();

        transactionKey = getServiceParameter(response, 'SubscriptionGuid');
        expect(response.isSuccess()).toBeTruthy();
    });

    test('Combined Subscription', async () => {
        method.createCombined({
            pushURL: 'https://buckaroo.dev/push',
            includeTransaction: false,
            transactionVatPercentage: 5,
            configurationCode: '1jg5ke6j',
            email: 'test@buckaroo.nl',
            ratePlans: {
                add: {
                    startDate: formatDate(new Date()),
                    ratePlanCode: '9863hdcj',
                },
            },
            phone: {
                mobile: '0612345678',
            },
            debtor: {
                code: 'johnsmith4',
            },
            company: {
                culture: 'nl-NL',
                companyName: 'Buckaroo B.V.',
                vatApplicable: true,
                vatNumber: 'NL140619562B01',
                chamberOfCommerce: '20091741',
            },
            address: {
                street: 'Hoofdstraat',
                houseNumber: '80',
                houseNumberAdditional: 'a',
                zipcode: '8441ER',
                city: 'Heerenveen',
                country: 'NL',
            },
        });

        const response = await method
            .combine('ideal')
            .pay({
                issuer: 'ABNANL2A',
                amountDebit: 10.1,
                startRecurrent: true,
                invoice: uniqid(),
            })
            .request();

        expect(response.isWaitingOnUserInput()).toBeTruthy();
    });

    test('Update', async () => {
        expect(transactionKey).toBeDefined();
        const response = await method
            .update({
                subscriptionGuid: transactionKey,
                configurationCode: '1jg5ke6j',
                email: 'test@buckaroo.nl',
                ratePlan: {
                    update: {
                        ratePlanGuid: '56CC308A1D694CF19F808993DD42BE7B',
                        endDate: '2030-01-01',
                        charge: {
                            ratePlanChargeGuid: '15C2CEEB39E34C86AAD0038ED73807B0',
                            baseNumberOfUnits: 1,
                            pricePerUnit: 5,
                        },
                    },
                },
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Update Combined Subscription', async () => {
        method.updateCombined({
            startRecurrent: true,
            subscriptionGuid: 'E29238210FE04E069FD83E16ACE50950',
        });
        const response = await method
            .combine('ideal')
            .pay({
                issuer: 'ABNANL2A',
                amountDebit: 10.1,
                invoice: uniqid(),
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Subscription Info', async () => {
        const response = await method
            .info({
                subscriptionGuid: transactionKey,
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Delete Subscription Config', async () => {
        const response = await method
            .deletePaymentConfig({
                subscriptionGuid: transactionKey,
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Subscription Pause', async () => {
        const response = await method
            .pause({
                subscriptionGuid: transactionKey,
                resumeDate: '2030-01-01',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Subscription Resume', async () => {
        const response = await method
            .resume({
                resumeDate: '2030-01-01',
                subscriptionGuid: transactionKey,
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Stop Subscription', async () => {
        const response = await method
            .stop({
                subscriptionGuid: transactionKey,
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
