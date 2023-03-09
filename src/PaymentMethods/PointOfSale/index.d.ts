import { PayablePaymentMethod } from '../PayablePaymentMethod';
declare class Pointofsale extends PayablePaymentMethod {
    protected _paymentName: string;
}
declare const pointofsale: () => Pointofsale;
export default pointofsale;
