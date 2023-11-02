import { PaymentMethod } from '../../Services';
import { IVerify, Verify } from './Models/Verify';

export default class Surepay<Code extends 'surepay', Manually extends boolean = false> extends PaymentMethod<
    Code,
    Manually
> {
    verify(payload: IVerify) {
        this.setServiceList('Verify', new Verify(payload));
        return super.dataRequest(payload);
    }
}
