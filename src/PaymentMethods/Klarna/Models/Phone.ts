export interface IPhone {
    mobile: string
}
export default class Phone  {
    phone: string
    constructor(data:IPhone) {
        this.phone = data.mobile
    }
}
