import buckarooClientTest from '../BuckarooClient.test';
const subscription = buckarooClientTest.method('subscriptions');
test('Create', async () => {
    subscription
        .create({
        additionalParameters: {
            signature: '123213'
        },
        ratePlans: {
            add: {
                startDate: '2024-07-23',
                ratePlanCode: 'zfv59mmy'
            }
        },
        ratePlanCharges: {
            add: {
                ratePlanChargeCode: 'test'
            }
        },
        configurationCode: 'gfyh9fe4',
        configuration: {
            name: 'owiejr'
        },
        debtor: {
            code: 'johnsmith4'
        }
    })
        .request()
        .then((data) => {
        expect(data.hasError()).toBeTruthy();
    })
        .catch((e) => {
        expect(e).toBeDefined();
    })
        .catch((e) => {
        expect(e).toBeDefined();
    });
});
test('Update', async () => {
    subscription
        .update({
        email: 'test@buckaroo.nl',
        subscriptionGuid: 'FC512FC9CC3A485D8CF3D1804FF6xxxx',
        configurationCode: '9wqe32ew',
        ratePlan: {
            update: {
                ratePlanGuid: 'F075470B1BB24B9291943A888A2Fxxxx',
                startDate: '2022-01-01',
                endDate: '2030-01-01'
            }
        }
    })
        .request()
        .then((data) => {
        expect(data).toBeDefined();
    });
});
test('Combined Subscription', async () => {
    const combinable = subscription
        .createCombined({
        pushURL: 'https://buckaroo.dev/push',
        includeTransaction: false,
        transactionVatPercentage: 5,
        configurationCode: 'gfyh9fe4',
        email: 'test@buckaroo.nl',
        ratePlans: {
            add: {
                startDate: '2033-01-01',
                ratePlanCode: '9863hdcj'
            }
        },
        phone: {
            mobile: '0612345678'
        },
        debtor: {
            code: 'johnsmith4'
        },
        company: {
            culture: 'nl-NL',
            companyName: 'My Company Coporation',
            vatApplicable: true,
            vatNumber: 'NL140619562B01',
            chamberOfCommerce: '20091741'
        },
        address: {
            street: 'Hoofdstraat',
            houseNumber: '90',
            zipcode: '8441ER',
            city: 'Heerenveen',
            country: 'NL'
        }
    })
        .combine('ideal')
        .pay({
        issuer: 'ABNANL2A',
        amountDebit: 10,
        startRecurrent: true
    })
        .request()
        .then((res) => {
        expect(res).toBeDefined();
    });
});
test('Update Combined Subscription', async () => {
    const combinable = subscription
        .updateCombined({
        subscriptionGuid: '515461997AD34C50881D74157E38A64D'
    })
        .combine('ideal')
        .pay({
        issuer: 'ABNANL2A',
        amountDebit: 10
    })
        .request()
        .then((res) => {
        expect(res).toBeDefined();
    });
});
test('Stop Subscription', async () => {
    const stop = await subscription.stop({
        subscriptionGuid: '515461997AD34C50881D74157E38A64D'
    });
    expect(stop).toBeDefined();
});
test('Subscription Info', async () => {
    const info = await subscription.info({
        subscriptionGuid: '515461997AD34C50881D74157E38A64D'
    });
    expect(info).toBeDefined();
});
test('Delete Subscription Config', async () => {
    await subscription
        .deletePaymentConfig({
        subscriptionGuid: '515461997AD34C50881D74157E38A64D'
    })
        .request()
        .then((res) => {
        expect(res.httpResponse.statusCode === 200).toBeTruthy();
    });
});
test('Subscription Pause', async () => {
    const pause = await subscription.pause({
        subscriptionGuid: '515461997AD34C50881D74157E38A64D',
        resumeDate: '2030-01-01'
    });
    expect(pause).toBeDefined();
});
test('Subscription Resume', async () => {
    const resume = await subscription.resume({
        resumeDate: '2030-01-01',
        subscriptionGuid: '515461997AD34C50881D74157E38A64D'
    });
    expect(resume).toBeDefined();
});
