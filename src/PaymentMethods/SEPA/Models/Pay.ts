import Customer from './Customer'
import PayForm from '../../../Models/PayForm'

export default class Pay extends PayForm {
  customer = (data) => this.customerFormat(data)

  bic = (data) => this.payFormat('customerbic', data)
  iban = (data) => this.payFormat('CustomerIBAN', data)
  collectdate
  mandateReference
  mandateDate

  customerFormat (data) {
    return {
      data: new Customer(data),
      groupType: '',
      groupID: ''
    }
  }

  payFormat (key, data) {
    return {
      data: { [key]: data },
      groupType: '',
      groupID: ''
    }
  }
}
