
import {pay,payRecurrent,extraInfo} from '../PaymentMethods/Paypal/Paypal'
import { uniqid } from "../Utils/Functions";



pay({
  amountDebit: 10,
  invoice: uniqid(),
});

payRecurrent({
  amountDebit: 10,
  originalTransactionKey: 'C32C0B52E1FE4A37835FFB1716XXXXXX',
  invoice: uniqid()
})

extraInfo({
  amountDebit: 10,
  invoice: uniqid(),
  customer: {
    name: "John Smith",
  },
  address: {
    street: "Hoofstraat 90",
    // street2: "Street 2",
    city: "Heerenveen",
    state: "Friesland",
    zipcode: "8441AB",
    country: "NL",
  },
  phone: {
    mobile: "0612345678",
  },
});
