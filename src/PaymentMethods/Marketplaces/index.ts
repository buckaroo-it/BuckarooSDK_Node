import PaymentMethod from '../../Services/PaymentMethod';
import { ISplit, Split } from './Models/Split';
import { ITransfer } from './Models/Transfer';

export default class Marketplaces<Code extends 'marketplaces', Manually extends boolean = false> extends PaymentMethod<
    Code,
    Manually
> {
    split(payload: ISplit) {
        this.setServiceList('Split', new Split(payload));
        return this.dataRequest(payload);
    }

    transfer(payload: ITransfer) {
        this.setServiceList('Transfer', new Split(payload));
        return this.dataRequest(payload);
    }

    refundSupplementary(payload: ISplit) {
        this.setServiceList('RefundSupplementary', new Split(payload));
        return this.dataRequest(payload);
    }
}
