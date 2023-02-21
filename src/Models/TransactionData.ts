import Services from "./Services";
import api from "../index";
import { IConfig, IPAddress } from "../Utils/Types";

export interface ITransactionData {
  order?: string
  amountDebit?: number | string
  invoice?: string
  currency?: string
  amountCredit?: number
  description?: string
  clientIP?: IPAddress
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
  additionalParameters?: {[name:string]:string|number}
}
type PartialRecord<K> = {
  [P in keyof K]: K[P]
};
export class TransactionData implements ITransactionData{
  AdditionalParameters?: Array<{[name:string]:string}>;
  amountCredit?: number;
  amountDebit?: number | string;
  clientIP?: IPAddress;
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

  constructor(data:PartialRecord<ITransactionData>) {
    for (const dataKey in data) {
     this[dataKey] = data[dataKey]
    }

    if(data.additionalParameters){
      this.setAdditionalParameters(data.additionalParameters)
    }
  }

  setServices(paymentName,serviceVersion,action,PayModel?){
    if(PayModel)
      this.services = new Services(paymentName, serviceVersion, action, PayModel)
    return this
  }
  setRequired(requiredFields:Array<keyof IConfig>){
    for (const requiredField of requiredFields) {
      this[requiredField] = this[requiredField] || api.config[requiredField]
    }
    return this
  }
  setAdditionalParameters(parameters){
    this.AdditionalParameters = []
    for (const parametersKey in parameters) {
      this.AdditionalParameters.push({
        name:parametersKey,
        value:parameters[parametersKey]
      })
    }
    delete this['additionalParameters']
  }
}