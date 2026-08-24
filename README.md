<p align="center">
  <a href="https://www.buckaroo.nl">
    <img src="https://raw.githubusercontent.com/buckaroo-it/Media/main/Buckaroo/README.md%20Headers/buckaroo-node-sdk-header-rounded.png" alt="Buckaroo — Node SDK" width="100%">
  </a>
</p>

<h1 align="center">Buckaroo Node SDK</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@buckaroo/buckaroo_sdk"><img src="https://img.shields.io/npm/v/@buckaroo/buckaroo_sdk.svg?label=release" alt="Latest release"></a>
  <a href="https://www.npmjs.com/package/@buckaroo/buckaroo_sdk"><img src="https://img.shields.io/node/v/@buckaroo/buckaroo_sdk.svg?label=node" alt="Node version"></a>
  <a href="https://docs.buckaroo.io/docs/node-sdk"><img src="https://img.shields.io/badge/docs-docs.buckaroo.io-1a1a4b.svg" alt="Documentation"></a>
  <a href="https://www.npmjs.com/package/@buckaroo/buckaroo_sdk"><img src="https://img.shields.io/badge/npm-download-cb3837.svg" alt="Download from npm"></a>
</p>

<p align="center">
  <a href="#about">About</a> &middot;
  <a href="#requirements">Requirements</a> &middot;
  <a href="#installation">Installation</a> &middot;
  <a href="#getting-started">Getting started</a> &middot;
  <a href="#server-side-use-only">Server-side use only</a> &middot;
  <a href="#testing">Testing</a> &middot;
  <a href="#support">Support</a> &middot;
  <a href="#contribute">Contribute</a>
</p>

---

## About

Buckaroo is a Dutch Payment Service Provider. More than 54,000 organisations rely on the Buckaroo platform to process their payments, subscriptions and unpaid invoices.

This is Buckaroo's official Node SDK: a modern, open source library that connects a JavaScript or TypeScript application to the Buckaroo API. It ships CommonJS and ES module builds along with TypeScript declarations, so it works in either module system without extra configuration.

[Full SDK documentation on docs.buckaroo.io](https://docs.buckaroo.io/docs/node-sdk), and the [API reference](https://docs.buckaroo.io/reference) for request parameters and service codes.

---

## Requirements

| Requirement | Supported versions |
|---|---|
| Node.js | 6.14 or higher |

You also need a Buckaroo account. Don't have one yet? [Request an account](https://www.buckaroo.nl/start).

---

## Installation

```bash
npm install @buckaroo/buckaroo_sdk
```

Or with yarn:

```bash
yarn add @buckaroo/buckaroo_sdk
```

---

## Getting started

### Configuring the client

You can find your Store key and Secret key under [API credentials in Buckaroo Plaza](https://plaza.buckaroo.nl/Configuration/Merchant/ApiKeys). Set `mode` to `TEST` while developing and to `LIVE` in production.

```javascript
import Buckaroo from '@buckaroo/buckaroo_sdk';

const buckarooClient = Buckaroo.InitializeClient(
    {
        websiteKey: 'YOUR_STORE_KEY',
        secretKey: 'YOUR_SECRET_KEY',
    },
    {
        mode: 'TEST', // or 'LIVE'
        currency: 'EUR',
        returnURL: 'https://example.com/return',
        pushURL: 'https://example.com/push',
    }
);
```

> [!NOTE]
> The `websiteKey` option takes your Store key. The Store key was previously called the Website key, and the option name has been kept for backwards compatibility.

> [!TIP]
> Keep your Secret key out of version control. Load both keys from environment variables instead — the repository ships an [`.env.example`](https://github.com/buckaroo-it/BuckarooSDK_Node/blob/master/.env.example) to start from.

### Creating a payment

Every payment method takes a slightly different payload. This example charges a Mastercard:

```javascript
const payment = await buckarooClient
    .method('mastercard')
    .pay({
        amountDebit: 100,
    })
    .request();
```

Swap `mastercard` for any other service code to use a different payment method. Service codes and their parameters are listed in the [API reference](https://docs.buckaroo.io/reference).

### Retrieving transaction information

Once a transaction exists you can query it on demand:

```javascript
const transaction = buckarooClient.transaction(payment.getTransactionKey());

await transaction.status();     // transaction status
await transaction.refundInfo(); // refund info
await transaction.cancelInfo(); // cancellation info
```

More runnable examples are in [`example/`](https://github.com/buckaroo-it/BuckarooSDK_Node/tree/master/example).

---

## Server-side use only

> [!WARNING]
> Use this library from your server only. Never bundle it into a website or mobile app.

This library is written in JavaScript, so it is technically possible to include it in front-end code — but doing so exposes your Secret key to everyone who loads the page. Anyone holding that key can act on your account's behalf.

In the intended setup, your server holds the Secret key and calls the Buckaroo API through this SDK. Nothing sensitive reaches the browser.

---

## Testing

```bash
npm install
npm test
```

Tests run with [Jest](https://jestjs.io/). Formatting is handled by Prettier:

```bash
npm run prettier
```

Tests that talk to the Buckaroo test environment need credentials, so copy `.env.example` to `.env` and fill in your test Store key and Secret key first.

---

## Support

Having trouble? Work through this list before reaching out:

1. Check the [SDK documentation](https://docs.buckaroo.io/docs/node-sdk) and the [API reference](https://docs.buckaroo.io/reference).
2. Confirm you are on the [latest release](https://www.npmjs.com/package/@buckaroo/buckaroo_sdk).
3. Reproduce the issue with `mode: 'TEST'` and inspect the full response, including the status subcode and message.
4. Verify that your push URL is reachable from outside your network. Buckaroo sends push messages from fixed IP addresses and ports, so make sure these are on your allow list. See [push messages](https://docs.buckaroo.io/docs/integration-push-messages) for the current list.

Still stuck? Contact us and include your Node.js version, SDK version, the service and action you called, the error message and the transaction key.

- **Bug reports and feature requests:** [open an issue](https://github.com/buckaroo-it/BuckarooSDK_Node/issues)
- **Technical support:** [support@buckaroo.nl](mailto:support@buckaroo.nl)
- **Phone:** +31 (0)30 711 50 50
- **Gateway status:** [status.buckaroo.io](https://status.buckaroo.io/)

---

## Contribute

We really appreciate it when developers help improve the Buckaroo SDKs. Please read our [Contribution Guidelines](https://github.com/buckaroo-it/BuckarooSDK_Node/blob/master/CONTRIBUTING.md) before opening a pull request, and target the `master` branch.

Found a security issue? Please report it privately to [support@buckaroo.nl](mailto:support@buckaroo.nl) instead of opening a public issue.

---

## Versioning

We follow semantic versioning (`MAJOR.MINOR.PATCH`):

- **MAJOR** — breaking changes that require additional testing and caution.
- **MINOR** — new functionality with limited impact.
- **PATCH** — bug fixes and hotfixes only.

All changes are documented in the [changelog](https://github.com/buckaroo-it/BuckarooSDK_Node/blob/master/CHANGELOG.md) and on the [releases page](https://github.com/buckaroo-it/BuckarooSDK_Node/releases).

---

## License

This SDK is open source software licensed under the [MIT license](https://github.com/buckaroo-it/BuckarooSDK_Node/blob/master/LICENSE).

---

<p align="center">
  <sub>Made with care by <a href="https://www.buckaroo.nl">Buckaroo</a>.<br>
  This document is subject to change; typos and language errors are possible.</sub>
</p>
