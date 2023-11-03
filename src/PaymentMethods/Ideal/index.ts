import { IPay, Pay } from './Models/Pay';
import { PayablePaymentMethod } from '../../Services';
import { RequestTypes } from '../../Constants';
import { IRefundRequest } from '../../Models';
import { ServiceCode } from '../../Utils';

export default class Ideal extends PayablePaymentMethod {
    protected _serviceVersion = 2;

    constructor(serviceCode: 'ideal' | 'idealprocessing' = 'ideal') {
        super(serviceCode);
    }

    public defaultServiceCode(): ServiceCode {
        return 'ideal';
    }

    pay(data: IPay) {
        return super.pay(data, new Pay(data));
    }

    payRemainder(payload: IPay) {
        return super.payRemainder(payload, new Pay(payload));
    }

    issuers() {
        return this.specification(RequestTypes.Transaction)
            .request()
            .then((response) => {
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
