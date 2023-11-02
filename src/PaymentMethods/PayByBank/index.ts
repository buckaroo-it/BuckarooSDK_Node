import { PayablePaymentMethod } from '../../Services';
import { IRefundRequest } from '../../Models';
import IPay, { Pay } from './Models/IPay';

export default class PayByBank extends PayablePaymentMethod {
    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }

    issuers() {
        return this.specification()
            .request()
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
