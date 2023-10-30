import buckarooClientTest from '../BuckarooClient.test';

const subscription = buckarooClientTest.method('subscriptions');

describe('Subscription methods', () => {
    test('Create', () => {
        return subscription
            .create({
                additionalParameters: {
                    signature: 'XXXXXXXX',
                },
                ratePlans: {
                    add: {
                        startDate: '2024-07-23',
                        ratePlanCode: 'XXXXXXXX',
                    },
                },
                ratePlanCharges: {
                    add: {
                        ratePlanChargeCode: 'XXXXXXXX',
                    },
                },
                configurationCode: 'XXXXXXXX',
                configuration: {
                    name: 'XXXXXXXX',
                },
                debtor: {
                    code: 'XXXXXXXX',
                },
            })
            .then((data) => {
                expect(data.hasError()).toBeTruthy();
            });
    });
    test('Update', async () => {
        subscription
            .update({
                email: 'test@buckaroo.nl',
                subscriptionGuid: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                configurationCode: 'XXXXXXXX',
                ratePlan: {
                    update: {
                        ratePlanGuid: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                        startDate: '2022-01-01',
                        endDate: '2030-01-01',
                    },
                },
            })
            .then((data) => {
                expect(data).toBeDefined();
            });
    });
    test('Combined Subscription', async () => {
        subscription.createCombined({
            pushURL: 'https://buckaroo.dev/push',
            includeTransaction: false,
            transactionVatPercentage: 5,
            configurationCode: 'XXXXXXXX',
            email: 'test@buckaroo.nl',
            ratePlans: {
                add: {
                    startDate: '2033-01-01',
                    ratePlanCode: 'XXXXXXXX',
                },
            },
            phone: {
                mobile: '0612345678',
            },
            debtor: {
                code: 'XXXXXXXX',
            },
            company: {
                culture: 'nl-NL',
                companyName: 'Buckaroo B.V.',
                vatApplicable: true,
                vatNumber: 'NLXXXXXXXXXXB01',
                chamberOfCommerce: 'XXXXXX41',
            },
            address: {
                street: 'Hoofdstraat',
                houseNumber: '80',
                zipcode: '8441ER',
                city: 'Heerenveen',
                country: 'NL',
            },
        });
        subscription
            .combine('ideal')
            .pay({
                issuer: 'ABNANL2A',
                amountDebit: 100,
                startRecurrent: true,
            })
            .then((data) => {
                expect(data).toBeDefined();
            });
    });

    test('Update Combined Subscription', async () => {
        subscription.updateCombined({
            subscriptionGuid: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        });
        subscription
            .combine('ideal')
            .pay({
                issuer: 'ABNANL2A',
                amountDebit: 100,
            })
            .then((data) => {
                expect(data).toBeDefined();
            });
    });

    test('Stop Subscription', async () => {
        const stop = await subscription.stop({
            subscriptionGuid: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        });
        expect(stop).toBeDefined();
    });
    test('Subscription Info', async () => {
        const info = await subscription.info({
            subscriptionGuid: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        });
        expect(info).toBeDefined();
    });
    test('Delete Subscription Config', async () => {
        await subscription
            .deletePaymentConfig({
                subscriptionGuid: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            })
            .then((res) => {
                expect(res.httpResponse.status === 200).toBeTruthy();
            });
    });
    test('Subscription Pause', async () => {
        const pause = await subscription.pause({
            subscriptionGuid: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            resumeDate: '2030-01-01',
        });
        expect(pause).toBeDefined();
    });
    test('Subscription Resume', async () => {
        const resume = await subscription.resume({
            resumeDate: '2030-01-01',
            subscriptionGuid: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        });
        expect(resume).toBeDefined();
    });
});
