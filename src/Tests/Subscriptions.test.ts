import { initializeBuckarooClient} from "../BuckarooClient";
import { Subscriptions } from "../PaymentMethods/Subscriptions/Subscriptions";
import { ideal } from "../PaymentMethods/Ideal/Ideal";
import { uniqid } from "../Utils/Functions";
initializeBuckarooClient()
const subscription = new Subscriptions()

test('Create', async () => {

     subscription.create({
            rate_plans: {
                add: {
                    startDate: "2022-01-01",
                    ratePlanCode: "5hxztsq5"
                }
            },
            debtor: {
                code: "xxxxxx"
            }
        })
        .then((data) => {
            expect(data).toBeDefined()
        })
})
test('Update', async () => {

    const subscriptionSpecifications = await subscription.specifications()
    console.log(subscriptionSpecifications)
    expect(subscriptionSpecifications).toBeDefined()
    // subscription.update({
    //     subscriptionGuid: "FC512FC9CC3A485D8CF3D1804FF6xxxx",
    //     configurationCode: "9wqe32ew",
    //     rate_plans: {
    //         update: {
    //             ratePlanGuid: "F075470B1BB24B9291943A888A2Fxxxx",
    //             startDate: "2022-01-01",
    //             endDate: "2030-01-01",
    //             charge: {
    //                 ratePlanChargeGuid: "AD375E2E188747159673440898B9xxxx",
    //                 baseNumberOfUnits: "1",
    //                 pricePerUnit: 10
    //             }
    //         }
    //     }
    // })
    // .then((data) => {
    //     expect(data).toBeDefined()
    // })
})

test('Combined Subscription', async () => {

    ideal.setPayload({
        startRecurrent:true,
        amountDebit: 10,
        invoice: uniqid('R_'),
        order: uniqid(),
        issuer: "ABNANL2A"
    })

    const combinable = subscription.createCombined({
        includeTransaction: false,
        transactionVatPercentage: 5,
        configurationCode: "gfyh9fe4",
        email: "test@buckaroo.nl",
        rate_plans: {
            add: {
                startDate: "2033-01-01",
                ratePlanCode: "9863hdcj"
            }
        },
        phone: {
            mobile: "0612345678"
        },
        debtor: {
            email:'test@buckaroo.nl',
            code: "johnsmith4"
        },
        company: {
            culture: "nl-NL",
            companyName: "My Company Coporation",
            vatApplicable: true,
            vatNumber: "NL140619562B01",
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


    let payment = await ideal.combine(combinable)
        .pay()
})