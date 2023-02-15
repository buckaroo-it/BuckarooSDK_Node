import { IPayForm } from "../../../Models/PayForm";
import Model from "../../../Models/Model";

export interface IAuthenticate extends IPayForm {
  saveToken: boolean | undefined
  description: string
}
export default class Authenticate extends Model {
  saveToken: boolean | undefined
  description: string = ''
  constructor (data) {
    super()
    this.setParameters(data)
  }
}
