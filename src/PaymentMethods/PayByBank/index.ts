import PayablePaymentMethod from '../../Services/PayablePaymentMethod';
import { IRefundRequest } from '../../Models/IRequest';
import IPay, { Pay } from './Models/IPay';

export default class PayByBank<Code extends 'PayByBank', Manually extends boolean = false> extends PayablePaymentMethod<
    Code,
    Manually
> {
    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }

    issuers() {
        return this.specification()
            .then((response) => {
                return response
                    .getActionRequestParameters('Pay')
                    ?.find((item) => item.name === 'issuer')
                    ?.listItemDescriptions!.map((item) => {
                        return { [item.value]: item.description };
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
