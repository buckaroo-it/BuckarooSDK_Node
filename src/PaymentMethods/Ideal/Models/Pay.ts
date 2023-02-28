import { PayPayload } from '../../../Models/Payload'

export interface IPay extends PayPayload {
    issuer: string
}

export const Services = (data) => {
    return {
        issuer:data.issuer
    }
}