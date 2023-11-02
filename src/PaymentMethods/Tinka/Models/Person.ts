import { Person } from '../../../Models';
import { Gender } from '../../../Constants';

export interface ITinkaPerson {
    gender: Gender;
    firstName: string;
    lastName: string;
    initials: string;
    birthDate: string;
}

export class TinkaPerson extends Person {
    set lastNamePrefix(value: string) {
        this.set('prefixLastName', value);
    }

    set birthDate(value: string) {
        this.set('dateOfBirth', value);
    }
}
