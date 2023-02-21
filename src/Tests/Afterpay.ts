import RecipientCategory from '../Constants/RecipientCategory'
import {
  pay,
  authorize,
  capture,
  refund,
  authorizeRemainder} from '../PaymentMethods/Afterpay/Afterpay'
import { uniqid } from '../Utils/Functions'
import { IPay } from "../PaymentMethods/Afterpay/Models/Pay";

let payload:IPay = {
  amountDebit: 50.3,
  invoice: uniqid(),
  billing: {
    recipient: {
      category: RecipientCategory.PERSON,
      careOf: 'John Smith',
      title: 'Mrs',
      firstName: 'John',
      lastName: 'Do',
      birthDate: '1990-01-01',
      conversationLanguage: 'NL',
      identificationNumber: 'IdNumber12345',
      customerNumber: 'customerNumber12345'
    },
    address: {
      street: 'Hoofdstraat',
      houseNumber: '13',
      houseNumberAdditional: 'a',
      zipcode: '1234AB',
      city: 'Heerenveen',
      country: 'NL'
    },
    email:'sadasd'
  },
  shipping: {
    recipient: {
      category: RecipientCategory.COMPANY,
      careOf: 'John Smith',
      companyName: 'Buckaroo B.V.',
      firstName: 'John',
      lastName: 'Do',
      gender:'male',
      chamberOfCommerce: '12345678'
    },
    address: {
      street: 'Kalverstraat',
      houseNumber: '13',
      houseNumberAdditional: 'b',
      zipcode: '4321EB',
      city: 'Amsterdam',
      country: 'NL'
    }
  },
  articles: [
    {
      identifier: 'Articlenumber1',
      description: 'Blue Toy Car',
      vatPercentage: 21,
      quantity: 2,
      price: 20.10
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

let refundPayload = {
  invoice  : 'testinvoice 123',
  originalTransactionKey : '4E8BD922192746C3918BF4077CXXXXXX',
  amountCredit : 1.23
}
// describe('testing Afterpay methods', () => {
  test('Pay', async() => {
    await pay(payload)
      .then(r => {
        console.log(r);
        expect(r.data).toBeDefined();
        expect(r.statusCode).toBeGreaterThanOrEqual(200);
        expect(r.statusCode).toBeLessThan(300);
      })
  });
//   test('Refund', async() => {
//     await refund(refundPayload)
//       .then(r => {
//         expect(r.data).toBeDefined();
//         expect(r.statusCode).toBeGreaterThanOrEqual(200);
//         expect(r.statusCode).toBeLessThan(300);
//       })
//   });
//   test('Authorize', async() => {
//     await authorize(refundPayload)
//       .then(r => {
//         expect(r.data).toBeDefined();
//         expect(r.statusCode).toBeGreaterThanOrEqual(200);
//         expect(r.statusCode).toBeLessThan(300);
//       })
//   });
//   test('Capture', async() => {
//     await capture(refundPayload)
//       .then(r => {
//         expect(r.data).toBeDefined();
//         expect(r.statusCode).toBeGreaterThanOrEqual(200);
//         expect(r.statusCode).toBeLessThan(300);
//       })
//   });
//   test('AuthorizeRemainder', async() => {
//     await authorizeRemainder(refundPayload)
//       .then(r => {
//         expect(r.data).toBeDefined();
//         expect(r.statusCode).toBeGreaterThanOrEqual(200);
//         expect(r.statusCode).toBeLessThan(300);
//       })
//   });
// });
