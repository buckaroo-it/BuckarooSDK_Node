import Services from "./Services";
import Model from "./Model";

export interface ITransactionData {
  order?: string
  amountDebit?: number | string
  invoice?: string
  currency?: string
  amountCredit?: number
  description?: string
  clientIP?: 'IPAddress'
  returnURL?: string
  returnURLCancel?: string
  returnURLError?: string
  returnURLReject?: string
  originalTransactionKey?: string
  startRecurrent?: boolean
  continueOnIncomplete?: 1 | 0
  servicesSelectableByClient?: string
  servicesExcludedForClient?: string
  pushURL?: string
  pushURLFailure?: string
  clientUserAgent?: string
  originalTransactionReference?: 'TransactionReference'
  services?: Services
  customParameters?: 'CustomParameters'
  additionalParameters?: 'TransactionRequestAdditionalParameters'
}

export class TransactionData extends Model implements ITransactionData{
  additionalParameters?: "TransactionRequestAdditionalParameters";
  amountCredit?: number;
  amountDebit?: number | string;
  clientIP?: "IPAddress";
  clientUserAgent?: string;
  continueOnIncomplete?: 1 | 0;
  currency?: string;
  customParameters?: "CustomParameters";
  description?: string;
  invoice?: string;
  order?: string;
  originalTransactionKey?: string;
  originalTransactionReference?: "TransactionReference";
  pushURL?: string;
  pushURLFailure?: string;
  returnURL?: string;
  returnURLCancel?: string;
  returnURLError?: string;
  returnURLReject?: string;
  services?: Services;
  servicesExcludedForClient?: string;
  servicesSelectableByClient?: string;
  startRecurrent?: boolean;
  constructor(data) {
    super()
    // this.setParameters(data)
  }
  setServices(paymentName,serviceVersion,action,PayModel?){
    if(typeof PayModel === 'object'){
      this.services = new Services(paymentName, serviceVersion, action, PayModel)
    }
    return this
  }
}