import Ideal from '../PaymentMethods/Ideal'
import Subscriptions from '../PaymentMethods/Subscriptions'
import CreditManagement from '../PaymentMethods/CreditManagement'

export type Combinable =
    | ReturnType<typeof Subscriptions>
    | ReturnType<typeof CreditManagement>
    | ReturnType<typeof Ideal>
