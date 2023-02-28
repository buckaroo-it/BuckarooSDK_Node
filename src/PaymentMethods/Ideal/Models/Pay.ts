import { PayPayload } from '../../../Models/Payload'

export interface IPay extends PayPayload {
    issuer: string
}
// export default class Services {
//     issuer: string
//     constructor(data) {
//         this.issuer = data.issuer
//     }
// }

export const Services = (data) => {
    return {
        issuer:data.issuer
    }
}