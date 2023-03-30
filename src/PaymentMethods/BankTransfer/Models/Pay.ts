import IPerson from '../../../Models/Services/IPerson'
import {ModelStrategy} from "../../../Utils/ModelStrategy";

export declare interface IPay {
    sendMail: boolean
    dateDue: string
    country: string
    email: string
    customer: IPerson
}
export class BankTransferModelStrategy extends ModelStrategy<IPay>{
    setData(data: IPay) {
        super.setData(data);
    }
    constructor(data) {
        super(data);
        this.keys = {
            customer:{
                gender: 'CustomerGender',
                firstName: 'CustomerFirstName',
                lastName: 'CustomerLastName',
            },
            email: 'CustomerEmail',
            country: 'CustomerCountry'
        }
    }
}