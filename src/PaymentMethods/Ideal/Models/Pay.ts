import Model from '../../../Models/Model'
import { ITransactionData } from '../../../Models/PayForm'

export interface IPay extends ITransactionData {
  issuer: string
}
export default class Pay extends Model {
  issuer: string = ''
  constructor (data) {
    super()
    this.setParameters(data)
  }
}
