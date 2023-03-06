import { PayPayload } from '../../../Models/Payload'
import { ServiceParameterList } from "../../../Utils/ServiceParameter";

export interface IPay extends PayPayload {
    issuer: string
}

export const Services = (data) => {
    return new ServiceParameterList({
        issuer: data.issuer
    })
}
