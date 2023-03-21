import { Payload } from '../../../Models/ITransaction'

export interface IPay extends Payload {
    costumer: {
        firstName: string
        lastName: string
    }
    email: string
}
export const Pay = (data: IPay) => {
    return {
        customerFirstName: data.costumer.firstName,
        customerLastName: data.costumer.lastName,
        customerEmail: data.email
    }
}
