export default class Pay{
    paymentData?
    customerCardName?
    constructor(data) {
        this.paymentData = data.paymentData
        this.customerCardName = data.customerCardName
    }
}