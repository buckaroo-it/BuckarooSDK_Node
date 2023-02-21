import { IPayForm } from '../../../Models/PayForm'
import Model from '../../../Models/Model'

export interface IPay extends IPayForm {
    useMobileView: boolean
}
export default class Pay extends Model {
    useMobileView: boolean = false
    constructor(data) {
        super()
        this.setParameters(data)
    }
}
