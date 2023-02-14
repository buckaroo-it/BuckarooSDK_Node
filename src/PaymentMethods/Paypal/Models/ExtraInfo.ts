import Address from './Address'
import Phone from './Phone'
import Customer from '../../PayPerEmail/Models/Customer'

export default class ExtraInfo {
  customer = (data) => this.customerFormat(data)
  address = (data) => this.addressFormat(data)
  phone = (data) => this.phoneFormat(data)
  noShipping
  addressOverride

  customerFormat (data) {
    if (data) {
      return {
        data: new Customer(data),
        groupType: '',
        groupID: ''
      }
    }
    return ''
  }

  addressFormat (data) {
    if (data) {
      return {
        data: new Address(data),
        groupType: '',
        groupID: ''
      }
    }
    return ''
  }

  phoneFormat (data) {
    return data ? new Phone(data) : ''
  }
}
