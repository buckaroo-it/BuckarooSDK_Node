import { Payload } from '../../../Models/ITransaction'

export interface IPay extends Payload {
    issuer: string
}

export const Services = (data) => {
    return {
        issuer: data.issuer
    }
}
