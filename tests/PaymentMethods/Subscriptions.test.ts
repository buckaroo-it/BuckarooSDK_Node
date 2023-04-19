import Subscriptions from '../../src/PaymentMethods/Subscriptions/index'
import Ideal from '../../src/PaymentMethods/Ideal/index'

require('../BuckarooClient.test')

const subscription = new Subscriptions()
const ideal = new Ideal()

test('Create', async () => {
    subscription
        .create({
            ratePlan: {
                update: {
                    startDate: '2024-07-23',
                    ratePlanGuid: ''
                }
            },
            ratePlanCharge: {
                add: {
                    ratePlanChargeCode: 'test'
                }
            },
            configurationCode: 'gfyh9fe4',
            addConfiguration: {
                name: 'owiejr'
            },
            debtor: {
                code: 'johnsmith4'
            }
        })
        .catch((e) => {
            expect(e.response.data).toBeDefined()
        })
        .catch((e) => {
            expect(e.response.data).toBeDefined()
        })
})
test('Update', async () => {
    subscription
        .update({
            email: { email: 'test@buckaroo.nl' },
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
        .then((data) => {
            expect(data).toBeDefined()
        })
})

test('Combined Subscription', async () => {
    const combinable = subscription.createCombined({
        address: undefined,
        allowedServices: '',
        b2b: '',
        bankAccount: { accountName: '', bic: '', iban: '' },
        billingTiming: 0,
        // company: undefined,
        configuration: undefined,
        configurationCode: '',
        customerAccountName: '',
        customerBIC: '',
        customerIBAN: '',
        debtor: { code: '' },
        email: { email: '' },
        includeTransaction: false,
        mandateReference: '',
        person: undefined,
        phone: undefined,
        ratePlan: undefined,
        ratePlanCharge: undefined,
        subscriptionGuid: '',
        termStartDay: 0,
        termStartMonth: 0,
        termStartWeek: '',
        transactionVatPercentage: 0
    })
    ideal
        .combine(combinable)
        .pay({
            issuer: 'ABNANL2A',
            amountDebit: 10,
            startRecurrent: true
        })
        .then((res) => {
            expect(res).toBeDefined()
        })
})

test('Update Combined Subscription', async () => {
    const combinable = subscription.updateCombined({
        subscriptionGuid: '515461997AD34C50881D74157E38A64D'
    })
    ideal
        .combine(combinable)
        .pay({
            issuer: 'ABNANL2A',
            amountDebit: 10
        })
        .then((res) => {
            expect(res).toBeDefined()
        })
})

test('Stop Subscription', async () => {
    const stop = await subscription.stop({
        subscriptionGuid: '515461997AD34C50881D74157E38A64D'
    })
    expect(stop).toBeDefined()
})
test('Subscription Info', async () => {
    const info = await subscription.info({
        subscriptionGuid: '515461997AD34C50881D74157E38A64D'
    })
    expect(info).toBeDefined()
})
test('Delete Subscription Config', async () => {
    await subscription
        .deletePaymentConfig({
            subscriptionGuid: '515461997AD34C50881D74157E38A64D'
        })
        .then((res) => {
            expect(res.status === 200).toBeTruthy()
        })
})
test('Subscription Pause', async () => {
    const pause = await subscription.pause({
        subscriptionGuid: '515461997AD34C50881D74157E38A64D',
        resumeDate: '2030-01-01'
    })
    expect(pause).toBeDefined()
})
test('Subscription Resume', async () => {
    const resume = await subscription.resume({
        resumeDate: '2030-01-01',
        subscriptionGuid: '515461997AD34C50881D74157E38A64D'
    })
    expect(resume).toBeDefined()
})
