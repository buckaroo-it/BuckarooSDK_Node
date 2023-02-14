import Customer from './Customer'
import Email from './Email'
import Attachment from './Attachment'

export default class PaymentInvitation {
  customer = (data) => this.customerFormat(data)
  email = (data) => this.emailFormat('email', data)
  merchantSendsEmail
  expirationDate
  paymentMethodsAllowed
  attachment
  attachments = (data) => this.attachmentsFormat(data)

  customerFormat (data) {
    return {
      data: new Customer(data),
      groupType: '',
      groupID: ''
    }
  }

  emailFormat (key, data) {
    return {
      data: new Email({ [key]: data }),
      groupType: 'Customer',
      groupID: ''
    }
  }

  attachmentsFormat (data) {
    if (!Array.isArray(data)) {
      data = [data]
    }
    const attachments: Attachment[] = []
    for (const datum of data) {
      attachments.push(new Attachment(datum))
    }
    return { data: attachments, groupType: '', groupID: 0 }
  }
}
