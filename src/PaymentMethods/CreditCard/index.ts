import { PayablePaymentMethod } from '../../Services';
import { IPaymentRequest, IRefundRequest, IRequest } from '../../Models';
import { CardData, ICardData } from './Models/CardData';
import { ISecurityCode, SecurityCode } from './Models/SecurityCode';

export default class CreditCard extends PayablePaymentMethod {
    payEncrypted(payload: ICardData) {
        this.setPayPayload(payload);
        this.setServiceList('PayEncrypted', new CardData(payload));
        return super.transactionRequest();
    }

    payWithSecurityCode(payload: ISecurityCode) {
        this.setPayPayload(payload);
        this.setServiceList('PayWithSecurityCode', new SecurityCode(payload));
        return super.transactionRequest();
    }

    authorize(payload: IPaymentRequest) {
        this.setPayPayload(payload);
        this.setServiceList('Authorize');
        return super.transactionRequest();
    }

    authorizeWithSecurityCode(payload: ISecurityCode) {
        this.setPayPayload(payload);
        this.setServiceList('AuthorizeWithSecurityCode', new SecurityCode(payload));
        return super.transactionRequest();
    }

    authorizeEncrypted(payload: ICardData) {
        this.setPayPayload(payload);
        this.setServiceList('AuthorizeEncrypted', new CardData(payload));
        return super.transactionRequest();
    }

    cancelAuthorize(payload: IRefundRequest) {
        this.setServiceList('CancelAuthorize');
        return super.transactionRequest(payload);
    }

    capture(payload: IRequest) {
        this.setPayPayload(payload);
        this.setServiceList('Capture');
        return super.transactionRequest();
    }

    payRecurrent(payload: IRequest) {
        this.setPayPayload(payload);
        this.setServiceList('PayRecurrent');
        return super.transactionRequest();
    }

    payRemainderEncrypted(payload: ICardData) {
        this.setPayPayload(payload);
        this.setServiceList('PayRemainderEncrypted', new CardData(payload));
        return super.transactionRequest();
    }
}
