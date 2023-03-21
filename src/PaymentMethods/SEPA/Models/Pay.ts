import { Payload } from '../../../Models/ITransaction'

export interface IPay extends Payload {
    bic: string
    iban: string
    collectDate: string
    mandateReference?: string
    mandateDate?: string
    customer: {
        name: string
    }
}
export const Pay = (data: IPay) => {
    return {
        customerbic: data.bic,
        customerIBAN: data.iban,
        collectDate: data.collectDate,
        mandateReference: data.mandateReference,
        mandateDate: data.mandateDate,
        customeraccountname: data.customer.name
    }
}
