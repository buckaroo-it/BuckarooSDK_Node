# BuckarooSDK_NodeJS

Repository containing the Node.js SDK by Buckaroo

## Installation

```bash
npm install @buckaroo/buckaroo_sdk
```

### About

Buckaroo is the Payment Service Provider for all your online payments with more than 15,000 companies relying on Buckaroo's platform to securely process their payments, subscriptions and unpaid invoices.

Start accepting payments today with Buckaroo.

### Requirements

To use the Buckaroo API client, the following things are required:

-   A Buckaroo account ([Dutch](https://www.buckaroo.nl/start) or [English](https://www.buckaroo.eu/solutions/request-form))
-   Node.js >= 10.0.0
-   Your website key and secret key

### Example

Initiate the buckaroo client with your website key and secret key.

```javascript
import { initializeBuckarooClient } from './BuckarooClient'
initializeBuckarooClient({ websiteKey: 'KEY', secretKey: 'SECRET' })
```

Create a payment with all the available payment methods. In this example, we show how to create a credit card payment. Each payment has a slightly different payload.

```javascript
import creditCard from './PaymentMethods/CreditCard'

const payment = await creditCard().pay({
    amountDebit: 10,
    name: 'Mastercard',
    invoice: 'UNIQUE-INVOICE-NO'
})
```

After you create a transaction, you can retrieve several transaction information on demand.

```javascript
const transactionKey = payment.Key

import { buckarooClient } from './BuckarooClient'

buckarooClient().status(transactionKey) // Retrieve transaction status
buckarooClient().refundInfo(transactionKey) // Retrieve refund info
buckarooClient().cancelInfo(transactionKey) // Retrieve cancellation info
```

Find our full documentation online on [dev.buckaroo.nl](https://dev.buckaroo.nl/).

### Contribute

We really appreciate it when developers contribute to improve the Buckaroo plugins.
If you want to contribute as well, then please follow our [Contribution Guidelines](CONTRIBUTING.md).

### Versioning

<p>
  <img src="https://user-images.githubusercontent.com/7081446/178474134-f4c3976d-653c-4ca1-bcd1-48bf6d489196.png" width="500px"  alt="">
</p>

-   **MAJOR:** Breaking changes that require additional testing/caution
-   **MINOR:** Changes that should not have a big impact
-   **PATCHES:** Bug and hotfixes only

### Additional information

-   **Support:** https://support.buckaroo.eu/contact
-   **Contact:** [support@buckaroo.nl](mailto:support@buckaroo.nl) or [+31 (0)30 711 50 50](tel:+310307115050)

## License

Buckaroo Node.js SDK is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
