// import PhoneModel from "../../../Models/Phone";
import Model from '../../../Models/Model'
export interface IPhone {
    mobile: string
}
export default class Phone extends Model implements IPhone {
    mobile: string = ''
    constructor(data) {
        super()
        this.setParameters(data)
        this.setKeys({
            mobile: 'phone'
        })
    }
}
