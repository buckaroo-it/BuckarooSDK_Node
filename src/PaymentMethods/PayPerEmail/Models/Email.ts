import EmailModel from '../../../Models/Email'
import Model from '../../../Models/Model'

export default class Email extends Model implements EmailModel {
  email?: string

  constructor (data) {
    super()
    this.email = data.email

    for (const dataKey in this) {
      if (!this[dataKey]) {
        delete this[dataKey]
      }
    }

    this.setKeys({
      email: 'CustomerEmail'
    })
  }
}
