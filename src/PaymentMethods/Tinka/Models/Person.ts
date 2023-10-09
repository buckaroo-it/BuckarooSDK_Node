import {Person} from "../../../Models/Interfaces/IRecipient";
import Gender from "../../../Constants/Gender";

export interface ITinkaPerson {
    gender : Gender,
    firstName: string,
    lastName : string,
    initials : string,
    birthDate : string,
}
export class TinkaPerson extends Person {
    set lastNamePrefix(value: string) {
        this.set('prefixLastName', value)
    }
    set birthDate(value: string) {
        this.set('dateOfBirth', value)
    }
}
