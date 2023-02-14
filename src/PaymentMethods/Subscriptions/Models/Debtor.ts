import DebtorModel from '../../../Models/Debtor'
export default class Debtor implements DebtorModel {
  code?: string
  constructor (data) {
    this.code = data.code
  }
}
