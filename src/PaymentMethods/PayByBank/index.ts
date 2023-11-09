import { PayablePaymentMethod } from '../../Services';
import { IRefundRequest } from '../../Models';
import IPay, { Pay } from './Models/IPay';
import { ServiceCode } from '../../Utils';
import { RequestTypes } from '../../Constants';

export default class PayByBank extends PayablePaymentMethod {
    public defaultServiceCode(): ServiceCode {
        return 'PayByBank';
    }

    pay(payload: IPay) {
        return super.pay(payload, new Pay(payload));
    }

    refund(payload: IRefundRequest) {
        return super.refund(payload);
    }

    issuers() {
        return this.specification(RequestTypes.Transaction, 1)
            .request()
            .then((response) => {
                return response
                    .getActionRequestParameters('Pay')
                    ?.find((item) => item.name === 'Issuer')
                    ?.listItemDescriptions!.map((item) => {
                        return { [item.value]: item.description };
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
