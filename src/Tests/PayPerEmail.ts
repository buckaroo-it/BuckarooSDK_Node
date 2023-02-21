import Gender from '../Constants/Gender'
import {pay,payRecurrent,paymentInvitation} from '../PaymentMethods/PayPerEmail/PayPerEmail'



paymentInvitation({
  amountDebit: 10,
  invoice: "testinvoice 123",
  merchantSendsEmail: false,
  email: "johnsmith@gmail.com",
  expirationDate: "2030-01-01",
  paymentMethodsAllowed: "ideal,mastercard,paypal",
  attachment: "",
  customer: {
    gender: Gender.FEMALE,
    firstName: "John",
    lastName: "Smith",
  },
});

paymentInvitation({
  amountDebit: 10,
  invoice: 'testinvoice 123',
  merchantSendsEmail: false,
  email: 'johnsmith@gmail.com',
  expirationDate: '2030-01-01',
  paymentMethodsAllowed: 'ideal,mastercard,paypal',
  attachment: '',
  customer: {
    gender: Gender.FEMALE,
    firstName: 'John',
    lastName: 'Smith'
  },
  attachments: [
    {
      name: 'bijlage1.pdf'
    },
    {
      name: 'bijlage2.pdf'
    }
  ]
})
