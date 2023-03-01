import { initializeBuckarooClient} from "../BuckarooClient";
import { subscriptions } from "../PaymentMethods/Subscriptions/Subscriptions";
import { ideal } from "../PaymentMethods/Ideal/Ideal";

initializeBuckarooClient()

const subscription =  subscriptions()

test('Create', async () => {

     subscription.create({
         configurationCode: "jpu9xccp",
         debtor: {
             code: "Vegim Carkaxhija"
         },
         email:'vegim@buckaroo.nl',
         person: {
             firstName: "John",
             lastName: "Do",
             gender: 1,
             culture: "nl-NL",
             birthDate: "1990-01-01"
         },
         configuration: {
             name: "TestVegim"
         },
         ratePlans: {
             add: {
                 startDate: "2023-03-10",
                 // ratePlanCode: "zfv59mmy",
                 endDate: "2023-06-10",
                 ratePlanName: "Test",
                 ratePlanDescription: "Test",
                 currency: "EUR",
                 billingTiming: 2,
                 automaticTerm: true,
                 billingInterval: "Monthly",
                 termStartDay: 1,
                 trialPeriodDays: 0,
                 trialPeriodMonths: 0,
             }
         },
         ratePlanCharges: {
             add: {
                 ratePlanChargeName: "pay and use",
                 rateplanChargeProductId: "",
                 rateplanChargeDescription: "asd",
                 unitOfMeasure: "",
                 ratePlanChargeType: "Recurring",
                 baseNumberOfUnits: 1,
                 partialBilling: "Nobilling",
                 pricePerUnit: 20,
                 priceIncludesVat: false,
                 vatPercentage: 0,
                 b2B: false
             }
         },
     })
        .then((data) => {
            expect(data).toBeDefined()
        })
})
test('Update', async () => {

    subscription.update({
        email: 'vegim@buckaroo.nl',
        subscriptionGuid: "FC512FC9CC3A485D8CF3D1804FF6xxxx",
        configurationCode: "9wqe32ew",
        ratePlans: {
            update: {
                ratePlanGuid: "F075470B1BB24B9291943A888A2Fxxxx",
                startDate: "2022-01-01",
                endDate: "2030-01-01",
                charge: {
                    ratePlanChargeGuid: "AD375E2E188747159673440898B9xxxx",
                    baseNumberOfUnits: "1",
                    pricePerUnit: 10
                }
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
        includeTransaction: false,
        transactionVatPercentage: 5,
        configurationCode: "gfyh9fe4",
        email: "test@buckaroo.nl",
        ratePlans: {
            add: {
                startDate: "2033-01-01",
                ratePlanCode: "9863hdcj"
            }
        },
        phone: {
            mobile: "0612345678"
        },
        debtor: {
            code: "johnsmith4"
        },
        company: {
            culture: "nl-NL",
            companyName: "My Company Coporation",
            vatApplicable: true,
            chamberOfCommerce: "20091741"
        },
        address: {
            street: "Hoofdstraat",
            houseNumber: "90",
            zipcode: "8441ER",
            city: "Heerenveen",
            country: "NL"
        }
    })
      ideal
        .combine(combinable)
        .pay({
            issuer:'ABNANL2A',
            amountDebit:10,
            startRecurrent:true
        })
          .then((res)=>{
              console.log(res)
          })
})

test('Update Combined Subscription', async () => {


    const combinable = subscription.updateCombined({
        subscriptionGuid:'65EB06079D854B0C9A9ECB0E2C1Cxxxx',
    })
    ideal
        .combine(combinable)
        .pay({
            issuer:'ABNANL2A',
            amountDebit:10,
        })
        .then((res)=>{
            console.log(res)
        })
})

test('Stop Subscription', async () => {
    const stop = await subscription.stop({
        subscriptionGuid:'65EB06079D854B0C9A9ECB0E2C1Cxxxx',
    })
})
test('Subscription Info', async () => {
    const info = await subscription.info({
        subscriptionGuid:'65EB06079D854B0C9A9ECB0E2C1Cxxxx',
    })
})
test('Delete Subscription Config', async () => {
    const deleteConfig = await subscription.deletePaymentConfig({
        subscriptionGuid:'65EB06079D854B0C9A9ECB0E2C1Cxxxx',
    })
})
test('Subscription Pause', async () => {
    const pause = await subscription.pause({
        subscriptionGuid:'65EB06079D854B0C9A9ECB0E2C1Cxxxx',
        resumeDate:'2030-01-01'
    })
})
test('Subscription Resume', async () => {
    const resume = await subscription.resume({
        resumeDate:'2030-01-01',
        subscriptionGuid:'65EB06079D854B0C9A9ECB0E2C1Cxxxx',
    })
})