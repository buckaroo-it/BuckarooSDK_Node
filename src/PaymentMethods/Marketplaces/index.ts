import { PaymentMethod } from '../../Services';
import { ISplit, Split } from './Models/Split';
import { ITransfer } from './Models/Transfer';

export default class Marketplaces extends PaymentMethod {
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
