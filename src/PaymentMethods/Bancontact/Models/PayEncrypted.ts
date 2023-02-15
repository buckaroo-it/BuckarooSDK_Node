import { IPayForm } from "../../../Models/PayForm";
import Model from "../../../Models/Model";
export interface IPayEncrypted extends IPayForm {
  encryptedCardData: string | object
  description?: string
}
export default class PayEncrypted extends Model {
  encryptedCardData: string | object = { encryptedCardData: '' }
  description?: string

  constructor (data) {
    super()
    this.setParameters(data)
  }

}
