import { uniqid } from '../Utils/Functions'
import Services from './Services'
import Model from './Model'

export interface IPayForm {
  order?: string
  amountDebit: number | string
  invoice: string
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

export default class PayForm extends Model  {
  additionalParameters?: "TransactionRequestAdditionalParameters";
  amountCredit?: number;
  clientIP?: "IPAddress";
  clientUserAgent?: string;
  continueOnIncomplete?: 1 | 0;
  currency?: string;
  customParameters?: "CustomParameters";
  description?: string;
  originalTransactionKey?: string;
  originalTransactionReference?: "TransactionReference";
  pushURL?: string;
  pushURLFailure?: string;
  returnURL?: string;
  returnURLCancel?: string;
  returnURLError?: string;
  returnURLReject?: string;
  servicesExcludedForClient?: string;
  servicesSelectableByClient?: string;
  startRecurrent?: boolean;
  order: string = uniqid('ORDER_NO_')
  amountDebit: number | string = ''
  invoice: string = ''
  services?: Services
  constructor (data:IPayForm, services?) {
    super()
    this.returnURL = data.returnURL
    if (services) {
      this.services = services
    }
    this.setParameters(data)
  }
}
