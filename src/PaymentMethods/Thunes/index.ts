import PaymentMethod from "../PaymentMethod";
import { ICapture, ITransaction, Payload } from "../../Models/ITransaction";

export default class Thunes extends PaymentMethod {
    protected _paymentName = "thunes";

    getStatus(payload: Required<Pick<ITransaction,'originalTransactionKey'>>) {
      this.action = 'getStatus'
      return this.dataRequest(payload)
    }
    capture(payload:ICapture) {
      this.action = 'capture'
      return this.transactionRequest(payload)
    }
    authorize(payload:Payload) {
      this.action = 'authorize'
      return this.dataRequest(payload)
    }
    cancel(payload:Pick<ITransaction,'originalTransactionKey'>) {
      this.action = 'cancel'
      return this.dataRequest(payload)
    }
}