<p align="center">
  <img src="https://user-images.githubusercontent.com/105488705/233078855-473c45d4-34a6-492a-a5af-05752c803f6b.png" width="200px" position="center">
</p>

# Node SDK

[![Latest release](https://badgen.net/github/release/buckaroo-it/BuckarooSDK_Node)](https://github.com/buckaroo-it/BuckarooSDK_Node/releases)

<p align="center">
  <img src="https://user-images.githubusercontent.com/7081446/233298897-30274cc8-86cc-4e6f-8200-759c801af19e.png" width="500px" position="center">
</p>

---

### Index

-   [About](#about)
-   [Requirements](#requirements)
-   [Installation](#installation)
-   [Example](#example)
-   [Contribute](#contribute)
-   [Versioning](#versioning)
-   [Additional information](#additional-information)

---

### About

Buckaroo is the the Payment Service Provider for all your online payments with more than 15,000 companies relying on Buckaroo's platform to securely process their payments, subscriptions and unpaid invoices. Buckaroo developed their own Node SDK. The SDK is a modern, open-source Node.js library that makes it easy to integrate your Javascript application with Buckaroo's services. Start accepting payments today with Buckaroo.

### Requirements

To use the Buckaroo API client, the following things are required:

-   A Buckaroo account ([Dutch](https://www.buckaroo.nl/start) or [English](https://www.buckaroo.eu/solutions/request-form))
-   Node.js 6.14.× or greater

### Installation

```bash
npm install @buckaroo/buckaroo_sdk
```

### Example

Initiate the buckaroo client with your website key and secret key. The keys can be retrieved from your [Buckaroo account](https://plaza.buckaroo.nl/Login).

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

Find our full documentation online on [docs.buckaroo.io](https://docs.buckaroo.io/docs/node-sdk).

### Regarding Usage Outside of Node.js
This library is written in JavaScript, a versatile programming language with broad applicability. While it's technically possible to integrate this library into a website or mobile application, it's strongly advised against doing so.

In the standard configuration, you make requests to the Buckaroo API using one of our provided libraries, typically from your server (such as a Node.js server). Your secret key is securely stored on this server, inaccessible to external entities.

However, if you incorporate this library directly into a website or app, your secret key will be exposed to users. This could enable users to take actions on your behalf using that key.

#### Need more examples?

More examples can be found in the [examples folder](https://github.com/buckaroo-it/BuckarooSDK_Node/tree/master/example)

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
