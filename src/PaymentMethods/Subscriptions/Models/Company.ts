import { Company as CompanyClass } from '../../../Models/Interfaces/IRecipient';

export default class Company extends CompanyClass {
    set companyName(companyName: string) {
        this.set('name', companyName);
    }
}
