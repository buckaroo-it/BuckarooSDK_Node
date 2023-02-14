import Model from '../../../Models/Model'
import { IPayForm } from '../../../Models/PayForm'

export interface IPay extends IPayForm {
  issuer: string
}
export default class Pay extends Model {
  issuer: string = ''
  constructor (data) {
    super()
    this.setParameters(data)
  }
}
