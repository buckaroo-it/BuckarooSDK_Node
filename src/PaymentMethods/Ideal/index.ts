import { IPay, Pay } from './Models/Pay';
import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { RequestTypes } from '../../Constants/Endpoints';
import { IRefundRequest } from '../../Models/IRequest';

export default class Ideal<Code extends 'ideal', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {
    protected _paymentName = 'Ideal';
    protected _serviceVersion = 2;

    constructor(serviceCode: 'ideal' | 'idealprocessing' = 'ideal') {
        super(serviceCode as Code);
    }

    pay(data: IPay) {
        return super.pay(data, new Pay(data));
    }

    payRemainder(payload: IPay) {
        return super.payRemainder(payload, new Pay(payload));
    }

    issuers() {
        return this.specification(RequestTypes.Transaction).then((response) => {
            return response
                .getActionRequestParameters('Pay')
                ?.find((item) => item.name === 'issuer')
                ?.listItemDescriptions?.map((item) => {
                    return { [item.value]: item.description };
                });
        });
    }

    instantRefund(data: IRefundRequest) {
        return super.refund(data);
    }
}
