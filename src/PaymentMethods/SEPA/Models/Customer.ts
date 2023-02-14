import Model from '../../../Models/Model'

export default class Customer extends Model {
  category?: string
  gender?: string
  culture?: string
  careOf?: string
  title?: string
  initials?: string
  name?: string
  firstName?: string
  lastNamePrefix?: string
  lastName?: string
  birthDate?: string
  placeOfBirth?: string
  constructor (data) {
    super()
    for (const dataKey in data) {
      if (this.hasOwnProperty(dataKey)) {
        this[dataKey] = data[dataKey]
      }
    }
    this.setKeys({
      name: 'customeraccountname'
    })
  }
}
