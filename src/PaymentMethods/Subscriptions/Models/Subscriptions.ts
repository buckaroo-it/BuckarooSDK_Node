import BillingRecipient from '../../Klarna/Models/BillingRecipient'
import RatePlan from './RatePlan'
import Phone from './Phone'
import Company from './Company'
import Address from './Address'
import { serviceParameterKeyOf } from '../../../Utils/Functions'

export default class Subscriptions {
  includeTransaction
  transactionVatPercentage
  configurationCode
  subscriptionGuid
  termStartDay
  termStartMonth
  billingTiming
  termStartWeek
  b2b
  mandateReference
  allowedServices
  UpdateRatePlan

  ratePlans = (data) => this.ratePlansFormat(data)
  debtor = (data) => this.debtorFormat(data)
  phone = (data) => this.phoneFormat(data)
  company = (data) => this.companyFormat(data)
  address = (data) => this.addressFormat(data)

  ratePlansFormat (data) {
    for (const [key, value] of Object.entries(data)) {
      return {
        data: new RatePlan(key, value),
        groupType: serviceParameterKeyOf(key) + 'RatePlan',
        groupID: ''
      }
    }
  }

  debtorFormat (data) {
    return {
      data: new BillingRecipient(data),
      groupType: 'Debtor',
      groupID: ''
    }
  }

  phoneFormat (data) {
    return data ? new Phone(data) : ''
  }

  companyFormat (data) {
    return data ? new Company(data) : ''
  }

  addressFormat (data) {
    return data ? new Address(data) : ''
  }
}
