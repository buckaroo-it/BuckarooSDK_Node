import { Payload } from '../../../Models/ITransaction'
import { ServiceParameterList } from "../../../Utils/ServiceParameter";

export interface IPay extends Payload {
    issuer: string
}

export const Services = (data) => {
    return new ServiceParameterList({
        issuer: data.issuer
    })
}
