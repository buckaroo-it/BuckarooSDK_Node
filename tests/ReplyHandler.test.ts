import crypto from 'crypto';
import client from './BuckarooClient.test';
import { Hmac, ReplyHandler } from '../src';

const credentials = client.credentials;
const uri = 'https://example.com/push';

// Signs like Buckaroo: fields sorted case-insensitively, joined without a separator.
const sign = (fields: [string, string][]) =>
    crypto
        .createHash('sha1')
        .update(
            [...fields]
                .sort(([a], [b]) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1))
                .map(([key, value]) => `${key}=${value}`)
                .join('') + credentials.secretKey
        )
        .digest('hex');

const body = (fields: [string, string][]) => new URLSearchParams(fields).toString();

const httpPost = (data: string) => new ReplyHandler(credentials, data).validate().isValid();

describe('Testing ReplyHandler HTTP post push', () => {
    const signed: [string, string][] = [
        ['brq_amount', '10.00'],
        ['brq_invoicenumber', 'INV1'],
        ['brq_statuscode', '490'],
        ['brq_test', 'true'],
    ];
    const signature = sign(signed);

    test('validates a genuine push', () => {
        expect(httpPost(body([...signed, ['brq_signature', signature]]))).toBe(true);
    });

    test('validates a genuine push regardless of field order', () => {
        expect(httpPost(body([['brq_signature', signature], ...[...signed].reverse()]))).toBe(true);
    });

    test('signs keys in case-insensitive order', () => {
        const fields: [string, string][] = [
            ['ADD_order', '1'],
            ['brq_amount', '10.00'],
            ['brq_SERVICE_ideal_consumerName', 'Test'],
            ['brq_statuscode', '190'],
            ['CUST_CustomerBillingStreet', 'Main'],
        ];
        expect(httpPost(body([...fields].reverse().concat([['brq_signature', sign(fields)]])))).toBe(true);
    });

    test.each(['brq_signature', 'BRQ_SIGNATURE', 'Brq_Signature'])('accepts the %s signature key', (key) => {
        expect(httpPost(body([...signed, [key, signature]]))).toBe(true);
    });

    test('rejects a tampered push', () => {
        const tampered = signed.map(([key, value]): [string, string] => [
            key,
            key === 'brq_statuscode' ? '190' : value,
        ]);
        expect(httpPost(body([...tampered, ['brq_signature', signature]]))).toBe(false);
    });

    test('rejects a forged duplicate placed before the genuine key', () => {
        expect(
            httpPost(
                'brq_amount=10.00&brq_invoicenumber=INV1&brq_statuscode=190&brq_statuscode=490&brq_test=true' +
                    `&brq_signature=${signature}`
            )
        ).toBe(false);
    });

    test('rejects keys that only differ by case', () => {
        expect(httpPost(body([...signed, ['Brq_statuscode', '190'], ['brq_signature', signature]]))).toBe(false);
    });

    test('rejects duplicate signatures', () => {
        expect(httpPost(body([...signed, ['brq_signature', signature], ['BRQ_SIGNATURE', signature]]))).toBe(false);
    });

    test('rejects re-split field boundaries', () => {
        const fields: [string, string][] = [
            ['brq_invoicenumber', 'INV1'],
            ['brq_payment', 'PAYKEY'],
            ['brq_statuscode', '490'],
            ['CUST_CustomerBillingStreet', 'Mainbrq_statuscode=190'],
        ];
        const forged: [string, string][] = [
            ['brq_invoicenumber', 'INV1'],
            ['brq_payment', 'PAYKEYbrq_statuscode=490'],
            ['CUST_CustomerBillingStreet', 'Main'],
            ['brq_statuscode', '190'],
        ];
        expect(httpPost(body([...forged, ['brq_signature', sign(fields)]]))).toBe(false);
    });

    test.each([
        ['a value that contains another field', ['brq_customer_name', 'Xbrq_statuscode=190']],
        ['a value that contains another field in other case', ['ADD_note', 'xCUST_a=1']],
        ['a key that contains =', ['brq_note=x', 'y']],
        ['a key outside brq_, add_ and cust_', ['note', 'x']],
        ['a key with non-word characters', ['brq_ſtatuscode', 'x']],
        ['a key that contains a second prefix', ['brq_sbrq_note', 'x']],
    ])('rejects %s even when the signature matches', (_, field) => {
        const fields = [...signed, field as [string, string]];
        expect(httpPost(body([...fields, ['brq_signature', sign(fields)]]))).toBe(false);
    });

    test('accepts values with = that do not contain a field', () => {
        const fields: [string, string][] = [...signed, ['ADD_returnurl', 'https://example.com/?cust=1&add_id']];
        expect(httpPost(body([...fields, ['brq_signature', sign(fields)]]))).toBe(true);
    });

    test('rejects a large unsigned value quickly', () => {
        const started = Date.now();
        expect(httpPost(body([...signed, ['brq_note', 'brq_'.repeat(50000)], ['brq_signature', signature]]))).toBe(
            false
        );
        expect(Date.now() - started).toBeLessThan(500);
    });

    test.each([
        ['missing', body(signed)],
        ['empty', body([...signed, ['brq_signature', '']])],
        ['wrong length', body([...signed, ['brq_signature', 'abc']])],
    ])('returns false for a %s signature', (_, data) => {
        expect(httpPost(data)).toBe(false);
    });

    test('exposes the validated fields', () => {
        const handler = new ReplyHandler(credentials, body([...signed, ['brq_signature', signature]])).validate();
        expect(handler.data()).toMatchObject({ brq_statuscode: '490', brq_invoicenumber: 'INV1' });
    });

    test('returns a copy of the validated fields', () => {
        const handler = new ReplyHandler(credentials, body([...signed, ['brq_signature', signature]])).validate();
        handler.data()!.brq_statuscode = '190';
        expect(handler.data()!.brq_statuscode).toBe('490');
    });

    test('does not expose fields of an invalid push', () => {
        const handler = new ReplyHandler(credentials, body([...signed, ['brq_signature', 'x'.repeat(40)]])).validate();
        expect(handler.data()).toBeUndefined();
    });

    test('does not expose fields before validation', () => {
        expect(new ReplyHandler(credentials, body([...signed, ['brq_signature', signature]])).data()).toBeUndefined();
    });
});

describe('Testing ReplyHandler JSON push', () => {
    const data = JSON.stringify({ Transaction: { Key: 'ABC123', Status: { Code: { Code: 190 } } } });
    const hmac = new Hmac();
    hmac.url = uri;
    hmac.data = data;
    const authHeader = hmac.generate(credentials);

    test('validates a genuine push', () => {
        expect(new ReplyHandler(credentials, data, authHeader, uri).validate().isValid()).toBe(true);
    });

    test('rejects a tampered push', () => {
        const tampered = data.replace('190', '490');
        expect(new ReplyHandler(credentials, tampered, authHeader, uri).validate().isValid()).toBe(false);
    });

    test.each([
        ['no header', undefined, uri],
        ['empty header', '', uri],
        ['no URI', authHeader, undefined],
    ])('does not fall back to form authentication with %s', (_, header, pushUri) => {
        const withForm = JSON.stringify({
            Transaction: { Key: 'ABC123' },
            brq_statuscode: '190',
            brq_signature: sign([['brq_statuscode', '190']]),
        });
        expect(new ReplyHandler(credentials, withForm, header, pushUri).validate().isValid()).toBe(false);
    });

    test.each(['invalid', 'hmac test-website:hash', 'hmac test-website:hash:nonce:1234567890', 'a:b::d'])(
        'returns false for the malformed header %s',
        (header) => {
            expect(new ReplyHandler(credentials, data, header, uri).validate().isValid()).toBe(false);
        }
    );
});

describe('Testing ReplyHandler with gateway push shapes', () => {
    // Pinned vectors shared with the PHP SDK, modelled on real Buckaroo push traffic (synthetic values).
    const gatewayCredentials = { websiteKey: 'test-website', secretKey: 'golden-secret-not-a-real-key' };
    const pushes: [string, string, string][] = [
        [
            'PayPal (service fields, ADD_ prefix)',
            'ADD_initiated_by_magento=1&ADD_service_action_from_magento=pay&brq_amount=26.62' +
                '&brq_currency=EUR&brq_customer_name=Test+Person&brq_description=Order+100000001' +
                '&brq_invoicenumber=100000001&brq_mutationtype=Processing&brq_ordernumber=100000001' +
                '&brq_payment=00000000000000000000000000000001' +
                '&brq_SERVICE_paypal_address_line_1=Example+Street+1' +
                '&brq_SERVICE_paypal_admin_area_2=Example+City&brq_SERVICE_paypal_CustomerName=Test+Person' +
                '&brq_SERVICE_paypal_orderId=EXAMPLEPPORDER1&brq_SERVICE_paypal_payerCountry=NL' +
                '&brq_SERVICE_paypal_payerEmail=payer%40example.com&brq_SERVICE_paypal_payerFirstname=Test' +
                '&brq_SERVICE_paypal_payerLastname=Person' +
                '&brq_SERVICE_paypal_paypalCaptureId=EXAMPLECAPTURE1' +
                '&brq_SERVICE_paypal_paypalTransactionID=EXAMPLEPPORDER1' +
                '&brq_SERVICE_paypal_postal_code=1234AB&brq_SERVICE_paypal_ProtectionEligibility=Eligible' +
                '&brq_SERVICE_paypal_ProtectionEligibilityType=ItemNotReceivedEligible%2cUnauthorizedPaymentEligible' +
                '&brq_SERVICE_paypal_VersionAsProperty=2&brq_statuscode=190&brq_statuscode_detail=S990' +
                '&brq_statusmessage=The+request+was+successful.&brq_test=true' +
                '&brq_timestamp=2026-01-01+00%3a00%3a00&brq_transaction_method=paypal' +
                '&brq_transaction_type=V010&brq_transactions=00000000000000000000000000000002' +
                '&brq_websitekey=EXAMPLEKEY01',
            '576c06ad5797eeb2e212b07f759c05a13df5424a',
        ],
        [
            'iDEAL pay-remainder (CUST_ block, UTF-8)',
            'ADD_initiated_by_magento=1&ADD_service_action_from_magento=payremainder&brq_amount=11.62' +
                '&brq_currency=EUR&brq_customer_name=T%c3%a8st+Person&brq_description=Order+100000002' +
                '&brq_invoicenumber=100000002&brq_mutationtype=Collecting&brq_ordernumber=100000002' +
                '&brq_payer_hash=00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000' +
                '&brq_payment=00000000000000000000000000000003' +
                '&brq_relatedtransaction_partialpayment=00000000000000000000000000000004' +
                '&brq_SERVICE_ideal_consumerBIC=BANKNL2A&brq_SERVICE_ideal_consumerIBAN=NL00BANK0123456789' +
                '&brq_SERVICE_ideal_consumerIssuer=Test+Bank' +
                '&brq_SERVICE_ideal_consumerName=T%c3%a8st+Person' +
                '&brq_SERVICE_ideal_transactionId=0000000000000001&brq_statuscode=190' +
                '&brq_statuscode_detail=S990&brq_statusmessage=The+request+was+successful.&brq_test=true' +
                '&brq_timestamp=2026-01-01+00%3a00%3a00&brq_transaction_method=ideal' +
                '&brq_transaction_type=C021&brq_transactions=00000000000000000000000000000005' +
                '&brq_websitekey=EXAMPLEKEY01&CUST_CustomerBillingCity=Example+City' +
                '&CUST_CustomerBillingCountry=Netherlands&CUST_CustomerBillingEmail=payer%40example.com' +
                '&CUST_CustomerBillingFirstName=Test&CUST_CustomerBillingHouseNumber=41' +
                '&CUST_CustomerBillingLastName=Person&CUST_CustomerBillingPostcode=1234+AB' +
                '&CUST_CustomerBillingStreet=Example+Street&CUST_CustomerBillingTelephone=0600000000' +
                '&CUST_CustomerShippingCity=Example+City&CUST_CustomerShippingCountry=Netherlands' +
                '&CUST_CustomerShippingEmail=payer%40example.com&CUST_CustomerShippingFirstName=Test' +
                '&CUST_CustomerShippingHouseNumber=41&CUST_CustomerShippingLastName=Person' +
                '&CUST_CustomerShippingPostcode=1234+AB&CUST_CustomerShippingStreet=Example+Street' +
                '&CUST_CustomerShippingTelephone=0600000000',
            '2a69597bdfaf67e0ba6cec1c7fc8ec84b4d0656b',
        ],
    ];
    const validate = (data: string) => new ReplyHandler(gatewayCredentials, data).validate().isValid();

    test.each(pushes)('validates %s', (_, data, signature) => {
        expect(validate(`${data}&brq_signature=${signature}`)).toBe(true);
    });

    test.each(pushes)('validates %s in any field order', (_, data, signature) => {
        expect(validate(`brq_signature=${signature}&${data.split('&').reverse().join('&')}`)).toBe(true);
    });

    test.each(pushes)('rejects a tampered %s', (_, data, signature) => {
        expect(validate(`${data.replace(/brq_amount=[^&]*/, 'brq_amount=9999.00')}&brq_signature=${signature}`)).toBe(
            false
        );
    });
});
