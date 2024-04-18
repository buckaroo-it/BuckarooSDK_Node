import { Company as CompanyClass } from '../../../Models';

export default class Company extends CompanyClass {
    set companyName(companyName: string) {
        this.set('name', companyName);
    }
}
