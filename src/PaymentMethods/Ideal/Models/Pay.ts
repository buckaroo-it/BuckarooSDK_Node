import { IPayForm } from '../../../Models/PayForm'

export interface IPay extends IPayForm {
    issuer: string
}
export default class Pay {
    issuer: string = ''
    constructor(data) {
        this.issuer = data.issuer
    }
}
