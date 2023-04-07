import Subscriptions from '../../src/PaymentMethods/Subscriptions/index'
import Ideal from '../../src/PaymentMethods/Ideal/index'

require('../BuckarooClient.test')

const subscription = new Subscriptions()
const ideal = new Ideal()

test('Create', async () => {
    subscription
        .create({
            address: undefined,
            allowedServices: '',
            b2b: '',
            bankAccount: { accountName: '', bic: '', iban: '' },
            billingTiming: 0,
            company: undefined,
            configuration: undefined,
            configurationCode: '',
            customerAccountName: '',
            customerBIC: '',
            customerIBAN: '',
            debtor: { code: '' },
            email: '',
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
        .then((data) => {
            expect(data).toBeDefined()
        })
})
test('Update', async () => {
    subscription
        .update({
            email: 'test@buckaroo.nl',
            subscriptionGuid: 'FC512FC9CC3A485D8CF3D1804FF6xxxx',
            configurationCode: '9wqe32ew',
            ratePlans: {
                update: {
                    ratePlanGuid: 'F075470B1BB24B9291943A888A2Fxxxx',
                    startDate: '2022-01-01',
                    endDate: '2030-01-01'
                }
            }
        })
        .then((data) => {
            console.log(data)
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
        company: undefined,
        configuration: undefined,
        configurationCode: '',
        customerAccountName: '',
        customerBIC: '',
        customerIBAN: '',
        debtor: { code: '' },
        email: '',
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
            console.log(res)
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
            console.log(res)
        })
})

test('Stop Subscription', async () => {
    const stop = await subscription.stop({
        subscriptionGuid: '515461997AD34C50881D74157E38A64D'
    })
    console.log(stop)
    expect(stop).toBeDefined()
})
test('Subscription Info', async () => {
    const info = await subscription.info({
        subscriptionGuid: '515461997AD34C50881D74157E38A64D'
    })
    console.log(info)
    expect(info).toBeDefined()
})
test('Delete Subscription Config', async () => {
    const deleteConfig = await subscription.deletePaymentConfig({
        subscriptionGuid: '515461997AD34C50881D74157E38A64D'
    }).then((res)=>{
        expect(res.status===200).toBeTruthy()
    })
})
test('Subscription Pause', async () => {
    const pause = await subscription.pause({
        subscriptionGuid: '515461997AD34C50881D74157E38A64D',
        resumeDate: '2030-01-01'
    })
    console.log(pause)
    expect(pause).toBeDefined()
})
test('Subscription Resume', async () => {
    const resume = await subscription.resume({
        resumeDate: '2030-01-01',
        subscriptionGuid: '515461997AD34C50881D74157E38A64D'
    })
    console.log(resume)
    expect(resume).toBeDefined()
})
