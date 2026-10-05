import client from '../BuckarooClient';

const Methods: typeof import('../../src/PaymentMethods') = require('../../src/PaymentMethods');

const services = [
    {
        canonical: 'ideal',
        aliases: ['ideal'],
        defaultCode: 'ideal',
    },
    {
        canonical: 'idealprocessing',
        aliases: ['idealprocessing'],
        defaultCode: 'idealprocessing',
    },
    {
        canonical: 'afterpay',
        aliases: ['afterpay'],
        defaultCode: 'afterpay',
    },
    {
        canonical: 'afterpaydigiaccept',
        aliases: ['afterpaydigiaccept'],
        defaultCode: 'afterpaydigiaccept',
    },
    {
        canonical: 'applepay',
        aliases: ['applepay'],
        defaultCode: 'applepay',
    },
    {
        canonical: 'bancontactmrcash',
        aliases: ['bancontactmrcash'],
        defaultCode: 'bancontactmrcash',
    },
    {
        canonical: 'banking',
        aliases: ['banking'],
        defaultCode: 'banking',
    },
    {
        canonical: 'transfer',
        aliases: ['transfer'],
        defaultCode: 'transfer',
    },
    {
        canonical: 'belfius',
        aliases: ['belfius'],
        defaultCode: 'belfius',
    },
    {
        canonical: 'billink',
        aliases: ['billink'],
        defaultCode: 'billink',
    },
    {
        canonical: 'bizum',
        aliases: ['bizum'],
        defaultCode: 'bizum',
    },
    {
        canonical: 'blik',
        aliases: ['blik'],
        defaultCode: 'blik',
    },
    {
        canonical: 'buckaroovoucher',
        aliases: ['buckaroovoucher'],
        defaultCode: 'buckaroovoucher',
    },
    {
        canonical: 'buckaroowalletcollecting',
        aliases: ['buckaroowalletcollecting', 'BuckarooWalletCollecting'],
        defaultCode: 'BuckarooWalletCollecting',
    },
    {
        canonical: 'CreditCard',
        aliases: [
            'CreditCard',
            'creditcard',
            'mastercard',
            'visa',
            'amex',
            'vpay',
            'maestro',
            'visaelectron',
            'cartebleuevisa',
            'cartebancaire',
            'dankort',
            'nexi',
            'postepay',
        ],
        defaultCode: 'CreditCard',
    },
    {
        canonical: 'creditmanagement3',
        aliases: ['creditmanagement3', 'CreditManagement3'],
        defaultCode: 'CreditManagement3',
    },
    {
        canonical: 'emandate',
        aliases: ['emandate'],
        defaultCode: 'emandate',
    },
    {
        canonical: 'eps',
        aliases: ['eps'],
        defaultCode: 'eps',
    },
    {
        canonical: 'giftcard',
        aliases: [
            'giftcard',
            'westlandbon',
            'babygiftcard',
            'babyparkgiftcard',
            'beautywellness',
            'boekenbon',
            'boekenvoordeel',
            'designshopsgiftcard',
            'fashioncheque',
            'fashionucadeaukaart',
            'fijncadeau',
            'koffiecadeau',
            'kokenzo',
            'kookcadeau',
            'nationaleentertainmentcard',
            'naturesgift',
            'podiumcadeaukaart',
            'shoesaccessories',
            'webshopgiftcard',
            'wijncadeau',
            'wonenzo',
            'yourgift',
            'vvvgiftcard',
            'parfumcadeaukaart',
            'customgiftcard',
            'customgiftcard2',
            'customgiftcard3',
        ],
        defaultCode: 'giftcard',
    },
    {
        canonical: 'googlepay',
        aliases: ['googlepay'],
        defaultCode: 'googlepay',
    },
    {
        canonical: 'idealqr',
        aliases: ['idealqr'],
        defaultCode: 'idealqr',
    },
    {
        canonical: 'idin',
        aliases: ['idin'],
        defaultCode: 'idin',
    },
    {
        canonical: 'capayable',
        aliases: ['capayable'],
        defaultCode: 'capayable',
    },
    {
        canonical: 'kbcpaymentbutton',
        aliases: ['kbcpaymentbutton', 'KBCPaymentButton'],
        defaultCode: 'KBCPaymentButton',
    },
    {
        canonical: 'klarna',
        aliases: ['klarna'],
        defaultCode: 'klarna',
    },
    {
        canonical: 'klarnakp',
        aliases: ['klarnakp'],
        defaultCode: 'klarnakp',
    },
    {
        canonical: 'marketplaces',
        aliases: ['marketplaces'],
        defaultCode: 'marketplaces',
    },
    {
        canonical: 'mbway',
        aliases: ['mbway', 'MBWay'],
        defaultCode: 'MBWay',
    },
    {
        canonical: 'multibanco',
        aliases: ['multibanco'],
        defaultCode: 'multibanco',
    },
    {
        canonical: 'payconiq',
        aliases: ['payconiq'],
        defaultCode: 'payconiq',
    },
    {
        canonical: 'paybybank',
        aliases: ['paybybank', 'PayByBank'],
        defaultCode: 'PayByBank',
    },
    {
        canonical: 'paypal',
        aliases: ['paypal'],
        defaultCode: 'paypal',
    },
    {
        canonical: 'payperemail',
        aliases: ['payperemail'],
        defaultCode: 'payperemail',
    },
    {
        canonical: 'pim',
        aliases: ['pim'],
        defaultCode: 'pim',
    },
    {
        canonical: 'pospayment',
        aliases: ['pospayment'],
        defaultCode: 'pospayment',
    },
    {
        canonical: 'przelewy24',
        aliases: ['przelewy24'],
        defaultCode: 'przelewy24',
    },
    {
        canonical: 'sepadirectdebit',
        aliases: ['sepadirectdebit'],
        defaultCode: 'sepadirectdebit',
    },
    {
        canonical: 'subscriptions',
        aliases: ['subscriptions'],
        defaultCode: 'subscriptions',
    },
    {
        canonical: 'surepay',
        aliases: ['surepay'],
        defaultCode: 'surepay',
    },
    {
        canonical: 'swish',
        aliases: ['swish'],
        defaultCode: 'swish',
    },
    {
        canonical: 'thunes',
        aliases: ['thunes'],
        defaultCode: 'thunes',
    },
    {
        canonical: 'alipay',
        aliases: ['alipay'],
        defaultCode: 'alipay',
    },
    {
        canonical: 'trustly',
        aliases: ['trustly'],
        defaultCode: 'trustly',
    },
    {
        canonical: 'twint',
        aliases: ['twint'],
        defaultCode: 'twint',
    },
    {
        canonical: 'wechatpay',
        aliases: ['wechatpay'],
        defaultCode: 'wechatpay',
    },
    {
        canonical: 'in3',
        aliases: ['in3', 'In3'],
        defaultCode: 'In3',
    },
    {
        canonical: 'noservice',
        aliases: ['noservice'],
        defaultCode: 'noservice',
    },
    {
        canonical: 'externalpayment',
        aliases: ['externalpayment'],
        defaultCode: 'externalpayment',
    },
    {
        canonical: 'clicktopay',
        aliases: ['clicktopay', 'ClickToPay'],
        defaultCode: 'ClickToPay',
    },
    {
        canonical: 'wero',
        aliases: ['wero'],
        defaultCode: 'wero',
    },
] as const;

describe('Testing payment method registration', () => {
    test.each(services)('$canonical supports its registered aliases', ({ canonical, aliases, defaultCode }) => {
        for (const alias of aliases) {
            const method = client.method(alias);
            expect(method).toBeInstanceOf(Methods[canonical]);
            expect(method.serviceCode).toBe(alias);
            expect(method.defaultServiceCode()).toBe(defaultCode);
        }
    });
    test('the contract lists every public payment method alias', () => {
        expect(services.flatMap((service) => [...service.aliases]).sort()).toEqual(Object.keys(Methods).sort());
    });
});
