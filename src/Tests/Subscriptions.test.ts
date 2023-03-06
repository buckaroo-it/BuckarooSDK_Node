import { initializeBuckarooClient } from '../BuckarooClient'
import { subscriptions } from '../PaymentMethods/Subscriptions/Subscriptions'
import { ideal } from '../PaymentMethods/Ideal/Ideal'

initializeBuckarooClient()

const subscription = subscriptions()

test('Create', async () => {
    subscription
        .create({
            configurationCode: 'jpu9xccp',
            debtor: {
                code: 'Vegim Carkaxhija'
            },
            email: 'vegim@buckaroo.nl',
            person: {
                firstName: 'John',
                lastName: 'Do',
                gender: 1,
                culture: 'nl-NL',
                birthDate: '1990-01-01'
            },
            configuration: {
                name: 'TestVegim'
            },
            ratePlans: {
                add: {
                    startDate: '2023-03-10',
                    // ratePlanCode: "zfv59mmy",
                    endDate: '2023-06-10',
                    ratePlanName: 'Test',
                    ratePlanDescription: 'Test',
                    currency: 'EUR',
                    billingTiming: 2,
                    automaticTerm: true,
                    billingInterval: 'Monthly',
                    termStartDay: 1,
                    trialPeriodDays: 0,
                    trialPeriodMonths: 0
                }
            },
            ratePlanCharges: {
                add: {
                    ratePlanChargeName: 'pay and use',
                    ratePlanChargeProductId: '',
                    ratePlanChargeDescription: 'asd',
                    unitOfMeasure: '',
                    ratePlanChargeType: 'Recurring',
                    baseNumberOfUnits: 1,
                    partialBilling: 'Nobilling',
                    pricePerUnit: 20,
                    priceIncludesVat: false,
                    vatPercentage: 0,
                    b2B: false
                }
            }
        })
        .then((data) => {
            expect(data).toBeDefined()
        })
})
test('Update', async () => {
    subscription
        .update({
            email: 'vegim@buckaroo.nl',
            subscriptionGuid: 'FC512FC9CC3A485D8CF3D1804FF6xxxx',
            configurationCode: '9wqe32ew',
            ratePlans: {
                update: {
                    ratePlanGuid: 'F075470B1BB24B9291943A888A2Fxxxx',
                    startDate: '2022-01-01',
                    endDate: '2030-01-01',
                },
            }
        })
        .then((data) => {
            console.log(data)
            expect(data).toBeDefined()
        })
})

test('Combined Subscription', async () => {
    const combinable = subscription.createCombined({
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
