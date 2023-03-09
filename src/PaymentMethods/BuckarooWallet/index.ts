import {PayablePaymentMethod} from '../PayablePaymentMethod'

class Buckaroowallet extends PayablePaymentMethod {

    protected _paymentName = 'buckaroowalletcollecting'

    pay(payload){
        return super.pay(payload)
    }
    refund(payload){
        return super.refund(payload)
    }
    deposit(payload){
        this.action = 'Deposit'
        return super.transactionRequest(payload)
    }
    reserve(payload){
        this.action = 'Reserve'
        return super.transactionRequest(payload)
    }
    withdrawal(payload){
        this.action = 'Withdrawal'
        return super.transactionRequest(payload)
    }
    cancel(payload){
        this.action = 'Cancel'
        return super.transactionRequest(payload)
    }
    create(){
        this.action = 'Create'
        return this.dataRequest()
    }
    update(){
        this.action = 'Update'
        return this.dataRequest()
    }
    getInfo(){
        this.action = 'Getinfo'
        return this.dataRequest()
    }
    release(){
        this.action = 'Release'
        return this.dataRequest()
    }
}

let _buckaroowallet:Buckaroowallet
const buckaroowallet:() => Buckaroowallet = () => {
    if (!_buckaroowallet)
        _buckaroowallet = new Buckaroowallet()
    return _buckaroowallet
}
export default buckaroowallet