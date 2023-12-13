import { IPaymentRequest, IPerson, ServiceParameter } from '../../../Models';

export interface IGenerate extends IPaymentRequest {
    description: string;
    title: string;
    return: Partial<IPerson> & {
        nickname?: string;
        birthNamePrefix?: string;
        birthName?: string;
        email: string;
    };
    result: {
        title: string;
        text: string;
    };
}

export class Generate extends ServiceParameter {
    set description(value: string) {
        this.set('description', value);
    }

    set title(value: string) {
        this.set('title', value);
    }

    set return(value: IGenerate['return']) {
        this.set('returnNickname', value.nickname);
        this.set('returnInitials', value.initials);
        this.set('returnFirstname', value.firstName);
        this.set('returnLastnamePrefix', value.lastNamePrefix);
        this.set('returnLastname', value.lastName);
        this.set('returnBirthnamePrefix', value.birthNamePrefix);
        this.set('returnBirthname', value.birthName);
        this.set('returnDateOfBirth', value.birthDate);
        this.set('returnGender', value.gender);
        this.set('returnEmail', value.email);
    }

    set result(value: IGenerate['result']) {
        this.set('resultTitle', value.title);
        this.set('resultText', value.text);
    }
}
