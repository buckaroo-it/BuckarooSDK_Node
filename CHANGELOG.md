# Changelog

All notable changes to this project will be documented in this file.

---

## [Released]

## [1.13.1]
- BTI-1824 Fix: Software header sends an outdated PlatformVersion.

## [1.13.0]
- BTI-1350 Remove GoSettle (Knaken) as a payment method, including its public export.
- BTI-1689 Security improvements.

## [1.12.3]
- BTI-1607 Push signature | Security improvements.

## [1.12.2]
- BTI-1297 Update README.md.
- BTI-1317 Add a GitHub Action to publish the package to npm.

## [1.12.1]
- BTI-1004 Align payment method code casing across all methods.
- BTI-1076 Add In3 authorize/capture flow for ABN-AMRO.

## [1.12.0]
- BTI-720 Add Banking payment method.

## [1.11.1]
- BTI-623 Add payRemainder support for Google Pay.

## [1.11.0]
- BTI-544 Update Klarna to the new Merchant of Record (MOR) version.

## [1.10.0]
- BA-1102 Remove Billink authorize/capture flow.

## [1.9.0]
- BA-954 Add Google Pay payment method.

## [1.8.1]
- BA-972 Fix: iDIN request issue with the verification ID.

## [1.8.0]
- BA-927 Add Wero payment method.
- BA-899 Add Twint payment method.
- BA-903 Add Bizum payment method.
- BA-918 Add Swish payment method.
- BA-914 Add ABN AMRO Zakelijk Achteraf Betalen (route parameters for In3).

## [1.7.0]
- BA-809 Add support for additionalParameters for iDIN.
- BA-766 Update and refactor tests.

## [1.6.0]
- BA-723 Add Click to Pay payment method.
- BA-721 Add Hosted Fields for credit and debit cards.
- BA-779 Update README.md.

## [1.5.0]
- BA-646 Add a configurable timeout for Buckaroo requests.

## [1.4.2]
- Add `tslib` as a dev dependency to fix build issues after publishing.

## [1.4.1]
- BA-639 Add articles to the KlarnaKP pay function.

## [1.4.0]
- BA-572 Add shipping fee parameters for iDEAL Fast Checkout (iDEAL Snel Bestellen).
- BA-535 Update the module version that is sent with every request.
- BA-590 Add product URL and image parameters for Klarna.
- BA-592 Add ClientIP parameter support for Klarna.
- BA-521 Remove Giropay (discontinued).
- BA-584 Remove Sofort (discontinued).

## [1.3.4]
- BA-412 Improve credential validation and add a message for incorrect credentials.
- BA-411 Fix: TypeError when reading 'sigBytes' from undefined properties.
- BA-486 Fix: pushURL and returnURL are not visible in the request.

## [1.3.3]
- BA-345 Make the push URL optional, so the Buckaroo Plaza website settings can be used instead.

## [1.3.2]
- Include the `dist` folder in the npm package.

## [1.3.1]
- BA-338 Add custom gift cards to the available payment methods.

## [1.3.0]
- BA-338 Add custom gift cards.

## [1.2.0]
- BA-270 Add iDEAL Fast Checkout (iDEAL Snel Bestellen).
- BA-165 Add Knaken Settle payment method.
- BA-279 Add Blik payment method.
- BA-241 Make it possible to override the version within requests.
- BA-263 Fix: iDEAL Processing.
- BA-251 Remove Tinka payment method.
- BA-277 Remove CreditClick payment method.

## [1.1.0]
- BP-3180 Add support for External Payments.
- BP-3188 Add iDEAL Processing.
- BP-3190 Add GetActiveSubscription call to retrieve all Buckaroo subscriptions.
- BP-3285 Fix: Info call for subscriptions stops the subscription.

## [1.0.5]
- Initial release.

## [1.0.0]
- Refactor method calls.
- Batch api calls.
- Response and push validation.
- Add general models.
- Add PayByBank
- Add In3 new

## [0.9.0]
- Beta release.
