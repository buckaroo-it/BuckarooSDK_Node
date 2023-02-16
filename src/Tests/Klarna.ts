import { pay,refund,payInInstallments } from '../PaymentMethods/Klarna/Klarna'
import { uniqid } from '../Utils/Functions'
import { IPay } from "../PaymentMethods/Klarna/Models/Pay";


let complexPayload:IPay = {
  amountDebit: 50.3,
  invoice: uniqid(),
  billing: {
    recipient: {
      category: 'B2C',
      gender: 'female',
      firstName: 'John',
      lastName: 'Do',
      birthDate: '1990-01-01'
    },
    address: {
      street: 'Hoofdstraat',
      houseNumber: '13',
      houseNumberAdditional: 'a',
      zipcode: '1234AB',
      city: 'Heerenveen',
      country: 'GB'
    },
    phone: {
      mobile: '0698765433'
    },
    email: 'test@buckaroo.nl'
  },
  shipping: {
    recipient: {
      category: 'B2C',
      gender: 'male',
      firstName: 'John',
      lastName: 'Do',
      birthDate: '1990-01-01'
    },
    address: {
      street: 'Kalverstraat',
      houseNumber: '13',
      houseNumberAdditional: 'b',
      zipcode: '4321EB',
      city: 'Amsterdam',
      country: 'GB'
    },
    email: 'test@buckaroo.nl'
  },
  articles: [
    {
      identifier: 'Articlenumber1',
      description: 'Blue Toy Car',
      vatPercentage: 21,
      quantity: 2,
      price: 32
    },
    {
      identifier: 'Articlenumber2',
      description: 'Red Toy Car',
      vatPercentage: 21,
      quantity: 1,
      price: 10.10
    }
  ]
}
// method.payInInstallments(getPaymentPayload);

describe('Testing Klarna methods', () => {
  test('Pay Complex Payload', async() => {
    await pay(complexPayload)
      .then(r => {
        console.log(JSON.stringify(r.data));
        expect(r.data).toBeDefined();
        expect(r.statusCode).toBeGreaterThanOrEqual(200);
        expect(r.statusCode).toBeLessThan(300);
      })
  });
});
