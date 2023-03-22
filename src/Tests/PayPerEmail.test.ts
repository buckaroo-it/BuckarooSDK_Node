import {initializeBuckarooClient} from "../BuckarooClient";
import payPerEmail from "../PaymentMethods/PayPerEmail/index";
import Gender from "../Constants/Gender";
import {ServiceObject} from "../Models/ServiceObject";

initializeBuckarooClient()
const method = payPerEmail()

describe('PayPerEmail methods', () => {
    test('paymentInvitation', async () => {
        await method.paymentInvitation({
            invoice: '123456',
            amountDebit: 10,
            currency: 'EUR',
            attachment: "",
            costumer: {firstName: "test", gender: Gender.FEMALE, lastName: "te"},
            email: 's',
            expirationDate: "",
            merchantSendsEmail: false,
            paymentMethodsAllowed: "ideal"
        }).then((response) => {
            response = new ServiceObject(response)
            console.log(response.find('parameterErrors'))
        })
    })
})