import Ideal from '../PaymentMethods/Ideal'
import Subscriptions from '../PaymentMethods/Subscriptions'
import CreditManagement from '../PaymentMethods/CreditManagement'
import EPS from '../PaymentMethods/EPS/index'
import CreditCard from '../PaymentMethods/CreditCard/index'
import Bancontact from '../PaymentMethods/Bancontact/index'
import Payconiq from '../PaymentMethods/Payconiq/index'
import Giropay from '../PaymentMethods/Giropay/index'
import Belfius from '../PaymentMethods/Belfius/index'
import Sofort from '../PaymentMethods/Sofort/index'
import Paypal from '../PaymentMethods/Paypal/index'
import SEPA from '../PaymentMethods/SEPA/index'
import KBC from '../PaymentMethods/KBC/index'

export type Combinable =
    | ReturnType<typeof CreditManagement>
    | ReturnType<typeof Subscriptions>
    | ReturnType<typeof CreditCard>
    | ReturnType<typeof Bancontact>
    | ReturnType<typeof Payconiq>
    | ReturnType<typeof Giropay>
    | ReturnType<typeof Belfius>
    | ReturnType<typeof Sofort>
    | ReturnType<typeof Paypal>
    | ReturnType<typeof Ideal>
    | ReturnType<typeof SEPA>
    | ReturnType<typeof KBC>
    | ReturnType<typeof EPS>
