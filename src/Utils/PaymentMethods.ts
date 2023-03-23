import afterpay from "../PaymentMethods/Afterpay";
import AfterpayDigiAccept from "../PaymentMethods/AfterpayDigiAccept";
import alipay from "../PaymentMethods/Alipay";
import ApplePay from "../PaymentMethods/ApplePay";
import bancontact from "../PaymentMethods/Bancontact";
import banktransfer from "../PaymentMethods/BankTransfer";
import belfius from "../PaymentMethods/Belfius";
import Billink from "../PaymentMethods/Billink";
import BuckarooVoucher from "../PaymentMethods/BuckarooVoucher";
import creditClick from "../PaymentMethods/CreditClick";
import CreditManagement from "../PaymentMethods/CreditManagement";
import EPS from "../PaymentMethods/EPS";
import giftcard from "../PaymentMethods/GiftCard";
import giropay from "../PaymentMethods/Giropay";
import ideal from "../PaymentMethods/Ideal";
import iDEALQR from "../PaymentMethods/iDealQR";
import in3 from "../PaymentMethods/In3";
import kbc from "../PaymentMethods/KBC";
import klarna from "../PaymentMethods/Klarna";
import payconiq from "../PaymentMethods/Payconiq";
import paypal from "../PaymentMethods/Paypal";
import payperemail from "../PaymentMethods/PayPerEmail";
import przelewy24 from "../PaymentMethods/Przelewy24";
import SEPA from "../PaymentMethods/SEPA";
import sofort from "../PaymentMethods/Sofort";
import Subscriptions from "../PaymentMethods/Subscriptions";
import Surepay from "../PaymentMethods/Surepay";
import Tinka from "../PaymentMethods/Tinka";
import Trustly from "../PaymentMethods/Trustly";
import WeChatPay from "../PaymentMethods/WeChatPay";

export class Methods {
    private _afterpay = afterpay;
    get afterpay(): ReturnType<typeof afterpay> {
        return this._afterpay();
    }
    private _afterPayDigiAccept = AfterpayDigiAccept;
    get afterPayDigiAccept(): ReturnType<typeof AfterpayDigiAccept>{
        return this._afterPayDigiAccept();
    }
    private _alipay = alipay;
    get alipay(): ReturnType<typeof alipay> {
        return this._alipay();
    }
    private _applePay = ApplePay;
    get applePay(): ReturnType<typeof ApplePay> {
        return this._applePay();
    }
    private _bancontact = bancontact;
    get bancontact(): ReturnType<typeof bancontact> {
        return this._bancontact();
    }
    private _banktransfer = banktransfer;
    get banktransfer(): ReturnType<typeof banktransfer> {
        return this._banktransfer();
    }
    private _belfius = belfius;
    get belfius(): ReturnType<typeof belfius> {
        return this._belfius();
    }
    private _billink = Billink;
    get billink(): ReturnType<typeof Billink> {
        return this._billink();
    }
    private _buckarooVoucher = BuckarooVoucher;
    get buckarooVoucher(): ReturnType<typeof BuckarooVoucher> {
        return this._buckarooVoucher();
    }
    private _creditClick = creditClick;
    get creditClick(): ReturnType<typeof creditClick> {
        return this._creditClick();
    }
    private _creditManagement = CreditManagement;
    get creditManagement(): ReturnType<typeof CreditManagement> {
        return this._creditManagement();
    }
    private _eps = EPS;
    get eps(): ReturnType<typeof EPS> {
        return this._eps();
    }
    private _giftcard = giftcard;
    get giftcard(): ReturnType<typeof giftcard> {
        return this._giftcard();
    }
    private _giropay = giropay;
    get giropay(): ReturnType<typeof giropay> {
        return this._giropay();
    }
    private _ideal = ideal;
    get ideal(): ReturnType<typeof ideal> {
        return this._ideal();
    }
    private _iDEALQR = iDEALQR;
    get iDEALQR(): ReturnType<typeof iDEALQR> {
        return this._iDEALQR();
    }
    private _in3 = in3;
    get in3(): ReturnType<typeof in3> {
        return this._in3();
    }
    private _kbc = kbc;
    get kbc(): ReturnType<typeof kbc> {
        return this._kbc();
    }
    private _klarna = klarna;
    get klarna(): ReturnType<typeof klarna> {
        return this._klarna();
    }
    private _payconiq = payconiq;
    get payconiq(): ReturnType<typeof payconiq> {
        return this._payconiq();
    }
    private _paypal = paypal;
    get paypal(): ReturnType<typeof paypal> {
        return this._paypal();
    }
    private _payperemail = payperemail;
    get payperemail(): ReturnType<typeof payperemail> {
        return this._payperemail();
    }
    private _przelewy24 = przelewy24;
    get przelewy24(): ReturnType<typeof przelewy24> {
        return this._przelewy24();
    }
    private _sepa = SEPA;
    get sepa(): ReturnType<typeof SEPA> {
        return this._sepa();
    }
    private _sofort = sofort;
    get sofort(): ReturnType<typeof sofort> {
        return this._sofort();
    }
    private _subscriptions = Subscriptions;
    get subscriptions(): ReturnType<typeof Subscriptions> {
        return this._subscriptions();
    }
    private _surepay = Surepay;
    get surepay(): ReturnType<typeof Surepay> {
        return this._surepay();
    }
    private _tinka = Tinka;
    get tinka(): ReturnType<typeof Tinka> {
        return this._tinka();
    }
    private _trustly = Trustly;
    get trustly(): ReturnType<typeof Trustly> {
        return this._trustly();
    }
    private _wechatPay = WeChatPay;
    get wechatPay(): ReturnType<typeof WeChatPay> {
        return this._wechatPay();
    }
}