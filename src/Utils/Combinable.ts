import Ideal from "../PaymentMethods/Ideal/index";
import Subscriptions from "../PaymentMethods/Subscriptions/index";
import CreditManagement from "../PaymentMethods/CreditManagement/index";


export type Combinable = ReturnType<typeof Ideal> |
                          ReturnType<typeof Subscriptions> |
                          ReturnType<typeof CreditManagement>
