import { IPaymentRequest } from '../../../Models/IRequest'
import { IPerson, Person } from '../../../Models/Interfaces/IRecipient'
import { ServiceParameter } from '../../../Models/ServiceParameters'

export interface IPay extends IPaymentRequest {
    customer?: Partial<IPerson>
    bic?: string
    iban?: string
    collectDate?: string
    mandateReference?: string
    mandateDate?: string
}
export class Pay extends ServiceParameter {
    get bic(): string {
        return this.get('customerbic')
    }
    set bic(value: string) {
        this.set('customerbic', value)
    }
    get iban(): string {
        return this.get('customerIBAN')
    }
    set iban(value: string) {
        this.set('customerIBAN', value)
    }
    set collectDate(value: string) {
        this.set('collectDate', value)
    }
    set mandateReference(value: string) {
        this.set('mandateReference', value)
    }
    set mandateDate(value: string) {
        this.set('mandateDate', value)
    }
    set customer(value: Partial<IPerson>) {
        this.set('customer', new Customer(value))
    }
}
export class Customer extends Person {
    set category(value) {}
    get name(): string {
        return this.get('customeraccountname')
    }
    set name(value: string) {
        this.set('customeraccountname', value)
    }
    get firstName(): string {
        return this.get('customeraccountname')
    }
    set firstName(value: string) {
        this.set('customeraccountname', value)
    }
}
