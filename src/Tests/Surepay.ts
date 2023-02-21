import {verify} from '../PaymentMethods/Surepay/Surepay'

verify({
  bankAccount: {
    iban: 'NL13TEST0123456789',
    accountName: 'John Doe'
  }
})
