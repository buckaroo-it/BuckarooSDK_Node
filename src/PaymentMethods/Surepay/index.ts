import PaymentMethod from '../../Services/PaymentMethod';
import { IVerify, Verify } from './Models/Verify';

export default class Surepay<Code extends 'surepay', Manually extends boolean = false> extends PaymentMethod<
    Code,
    Manually
> {
    protected _paymentName = 'Surepay';

    verify(payload: IVerify) {
        this.setServiceList('Verify', new Verify(payload));
        return super.dataRequest(payload);
    }
}
