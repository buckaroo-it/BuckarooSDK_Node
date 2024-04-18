import { IPay, Pay } from './Models/Pay';
import { PayablePaymentMethod } from '../../Services';
import { RequestTypes } from '../../Constants';
import { ServiceCode } from '../../Utils';

export default class IdealProcessing extends PayablePaymentMethod {
    protected _serviceVersion = 2;

    public defaultServiceCode(): ServiceCode {
        return 'idealprocessing';
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
}
