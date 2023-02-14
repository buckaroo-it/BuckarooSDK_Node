import { uniqid } from './Utils/Functions'
import Api from './BuckarooClient'
import ideal,{pay,issuers} from './PaymentMethods/Ideal/Ideal'
import afterpay from "./PaymentMethods/Afterpay/Afterpay";
import klarna from "./PaymentMethods/Afterpay/Afterpay";

// pay({
//   returnURL: 'https://example.com/return',
//   invoice: uniqid(),
//   amountDebit: 10.1,
//   issuer: 'ABNANL2A'
// })
// ideal.pay({
//   returnURL: 'https://example.com/return',
//   invoice: uniqid(),
//   amountDebit: 10.1,
//   issuer: 'ABNANL2A',
// })
// afterpay.pay(
//   { amountDebit: 76, invoice: "", issuer: "" }
// )
// klarna.pay({
//   amountDebit: 50.3,
//   invoice: uniqid(),
//   currency: 'GBP',
//   billing: {
//     recipient: {
//       category: 'B2C',
//       gender: 'female',
//       firstName: 'John',
//       lastName: 'Do',
//       birthDate: '1990-01-01'
//     },
//     address: {
//       street: 'Hoofdstraat',
//       houseNumber: '13',
//       houseNumberAdditional: 'a',
//       zipcode: '1234AB',
//       city: 'Heerenveen',
//       country: 'GB'
//     },
//     phone: {
//       mobile: '0698765433'
//     },
//     email: 'test@buckaroo.nl'
//   },
//   shipping: {
//     recipient: {
//       category: 'B2C',
//       gender: 'male',
//       firstName: 'John',
//       lastName: 'Do',
//       birthDate: '1990-01-01'
//     },
//     address: {
//       street: 'Kalverstraat',
//       houseNumber: '13',
//       houseNumberAdditional: 'b',
//       zipcode: '4321EB',
//       city: 'Amsterdam',
//       country: 'GB'
//     },
//     email: 'test@buckaroo.nl'
//   },
//   articles: [
//     {
//       identifier: 'Articlenumber1',
//       vatPercentage: 21,
//       quantity: 2,
//       price: 32,
//     },
//     {
//       identifier: 'Articlenumber2',
//       description: 'Red Toy Car',
//       vatPercentage: 21,
//       quantity: 1,
//       price: 10.10
//     }
//   ]
// })


// Ideal.issuers()

// Ideal.payRemainder()
