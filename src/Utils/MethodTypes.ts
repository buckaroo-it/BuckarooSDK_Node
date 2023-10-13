import type Ideal from '../PaymentMethods/Ideal';
import type Afterpay from '../PaymentMethods/Afterpay';
import type AfterpayDigiAccept from '../PaymentMethods/AfterpayDigiAccept';
import type ApplePay from '../PaymentMethods/ApplePay';
import type Bancontact from '../PaymentMethods/Bancontact';
import type Banktransfer from '../PaymentMethods/BankTransfer';
import type Belfius from '../PaymentMethods/Belfius';
import type Billink from '../PaymentMethods/Billink';
import type BuckarooVoucher from '../PaymentMethods/BuckarooVoucher';
import type BuckarooWallet from '../PaymentMethods/BuckarooWallet';
import type CreditCard from '../PaymentMethods/CreditCard';
import type CreditClick from '../PaymentMethods/CreditClick';
import type CreditManagement from '../PaymentMethods/CreditManagement';
import type Emandates from '../PaymentMethods/Emandates';
import type EPS from '../PaymentMethods/EPS';
import type GiftCard from '../PaymentMethods/GiftCard';
import type Giropay from '../PaymentMethods/Giropay';
import type IdealQr from '../PaymentMethods/IdealQR';
import type Idin from '../PaymentMethods/Idin';
import type In3Old from '../PaymentMethods/In3Old';
import type KBC from '../PaymentMethods/KBC';
import type Klarna from '../PaymentMethods/Klarna';
import type KlarnaKp from '../PaymentMethods/KlarnaKP';
import type Marketplaces from '../PaymentMethods/Marketplaces';
import type Payconiq from '../PaymentMethods/Payconiq';
import type PayByBank from '../PaymentMethods/PayByBank';
import type Paypal from '../PaymentMethods/Paypal';
import type PayPerEmail from '../PaymentMethods/PayPerEmail';
import type PiM from '../PaymentMethods/PiM';
import type PointOfSale from '../PaymentMethods/PointOfSale';
import type Przelewy24 from '../PaymentMethods/Przelewy24';
import type SEPA from '../PaymentMethods/SEPA';
import type Sofort from '../PaymentMethods/Sofort';
import type Subscriptions from '../PaymentMethods/Subscriptions';
import type Surepay from '../PaymentMethods/Surepay';
import type Thunes from '../PaymentMethods/Thunes';
import type Tinka from '../PaymentMethods/Tinka';
import type Alipay from '../PaymentMethods/Alipay';
import type Trustly from '../PaymentMethods/Trustly';
import type Wechatpay from '../PaymentMethods/WeChatPay';
import type In3 from '../PaymentMethods/In3';
import type MultiBanco from '../PaymentMethods/Multibanco';
import type Mbway from "../PaymentMethods/Mbway";

//toDo refactor this

export type AllMethods = readonly [
    { class: Afterpay; code: MethodTypes['Afterpay'] },
    { class: AfterpayDigiAccept; code: MethodTypes['AfterpayDigiAccept'] },
    { class: Alipay; code: MethodTypes['Alipay'] },
    { class: ApplePay; code: MethodTypes['ApplePay'] },
    { class: Bancontact; code: MethodTypes['Bancontact'] },
    { class: Banktransfer; code: MethodTypes['BankTransfer'] },
    { class: Belfius; code: MethodTypes['Belfius'] },
    { class: Billink; code: MethodTypes['Billink'] },
    { class: BuckarooVoucher; code: MethodTypes['BuckarooVoucher'] },
    { class: BuckarooWallet; code: MethodTypes['BuckarooWallet'] },
    { class: CreditCard; code: MethodTypes['CreditCard'] },
    { class: CreditClick; code: MethodTypes['CreditClick'] },
    { class: CreditManagement; code: MethodTypes['CreditManagement'] },
    { class: Emandates; code: MethodTypes['Emandates'] },
    { class: EPS; code: MethodTypes['EPS'] },
    { class: GiftCard; code: MethodTypes['GiftCard'] },
    { class: Giropay; code: MethodTypes['Giropay'] },
    { class: Ideal; code: MethodTypes['Ideal'] },
    { class: IdealQr; code: MethodTypes['IdealQR'] },
    { class: Idin; code: MethodTypes['Idin'] },
    { class: In3Old; code: MethodTypes['In3Old'] },
    { class: In3; code: MethodTypes['In3'] },
    { class: KBC; code: MethodTypes['KBC'] },
    { class: Klarna; code: MethodTypes['Klarna'] },
    { class: KlarnaKp; code: MethodTypes['KlarnaKP'] },
    { class: Marketplaces; code: MethodTypes['Marketplaces'] },
    { class: Payconiq; code: MethodTypes['Payconiq'] },
    { class: PayByBank; code: MethodTypes['PayByBank'] },
    { class: Paypal; code: MethodTypes['Paypal'] },
    { class: PayPerEmail; code: MethodTypes['PayPerEmail'] },
    { class: PiM; code: MethodTypes['PiM'] },
    { class: PointOfSale; code: MethodTypes['PointOfSale'] },
    { class: Przelewy24; code: MethodTypes['Przelewy24'] },
    { class: SEPA; code: MethodTypes['SEPA'] },
    { class: Sofort; code: MethodTypes['Sofort'] },
    { class: Subscriptions; code: MethodTypes['Subscriptions'] },
    { class: Surepay; code: MethodTypes['Surepay'] },
    { class: Thunes; code: MethodTypes['Thunes'] },
    { class: Tinka; code: MethodTypes['Tinka'] },
    { class: Trustly; code: MethodTypes['Trustly'] },
    { class: Wechatpay; code: MethodTypes['WeChatPay'] },
    { class: MultiBanco; code: MethodTypes['Multibanco'] },
    { class: Mbway ; code: MethodTypes['Mbway'] },
];
export type ServiceCode = AllMethods[number]['code'][number];

export type MethodFromServiceCode<Code extends ServiceCode, Methods extends AllMethods[number] = AllMethods[number]> = {
    [Key in Methods['code'][number]]: Methods extends {
        class: infer Class;
        code: readonly (infer Codes)[];
    }
        ? Extract<Codes, Code> extends never
            ? never
            : Class
        : never;
}[Code];

export const Methods = {
    Afterpay: ['afterpay'],
    AfterpayDigiAccept: ['afterpaydigiaccept'],
    Alipay: ['alipay'],
    ApplePay: ['applepay'],
    Bancontact: ['bancontactmrcash'],
    BankTransfer: ['transfer'],
    Belfius: ['belfius'],
    Billink: ['billink'],
    BuckarooVoucher: ['buckaroovoucher'],
    BuckarooWallet: ['BuckarooWalletCollecting'],
    CreditCard: ['creditcard', 'mastercard', 'visa', 'amex', 'vpay', 'maestro', 'visaelectron', 'cartebleuevisa', 'cartebancaire', 'dankort', 'nexi', 'postepay'],
    CreditClick: ['creditclick'],
    CreditManagement: ['CreditManagement3'],
    Emandates: ['emandate'],
    EPS: ['eps'],
    GiftCard: [
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
    ],
    Giropay: ['giropay'],
    IdealQR: ['idealqr'],
    Idin: ['idin'],
    In3Old: ['capayable'],
    In3: ['In3'],
    KBC: ['KBCPaymentButton'],
    Klarna: ['klarna'],
    Ideal: ['ideal', 'idealprocessing'],
    Przelewy24: ['przelewy24'],
    KlarnaKP: ['klarnakp'],
    Marketplaces: ['Marketplaces'],
    PayByBank: ['PayByBank'],
    PayPerEmail: ['payperemail'],
    Payconiq: ['payconiq'],
    Paypal: ['paypal'],
    PiM: ['PiM'],
    PointOfSale: ['pointofsale'],
    SEPA: ['sepadirectdebit'],
    Sofort: ['sofortueberweisung'],
    Subscriptions: ['subscriptions'],
    Surepay: ['surepay'],
    Thunes: ['thunes'],
    Tinka: ['tinka'],
    Trustly: ['trustly'],
    WeChatPay: ['wechatpay'],
    Multibanco: ['multibanco'],
    Mbway: ['MBWay'],
} as const;

type MethodTypes = typeof Methods;
export default function getMethod<Code extends ServiceCode>(code: Code): MethodFromServiceCode<Code> {
    let method: string | undefined;
    for (const key in Methods) {
        if (Methods[key].includes(code)) {
            method = key;
            break;
        }
    }
    if (!method) throw new Error(`Wrong payment method code has been given`);

    let methodClass = require(`../PaymentMethods/${method}`).default;

    return new methodClass(code);
}
