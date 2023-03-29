import IPerson from '../../../Models/Services/IPerson'
import { ServiceParameters } from '../../../Utils/ServiceParameters'

export declare interface IPay {
    sendMail: boolean
    dateDue: string
    country: string
    email: string
    customer: IPerson
}
export const Pay = (data) => {
    let costumer = new ServiceParameters(data)
    costumer.setKeys({
        customer:{
            gender: 'CustomerGender',
            firstName: 'CustomerFirstName',
            lastName: 'CustomerLastName',
        },
        email: 'CustomerEmail'
    })
    return {
        sendMail: data.sendMail,
        dateDue: data.dateDue,
        customerCountry: data.country,
        email: data.email,
        customer: costumer
    }
}
