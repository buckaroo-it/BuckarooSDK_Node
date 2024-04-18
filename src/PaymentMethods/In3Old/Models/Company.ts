import { Company } from "../../../Models";

export class In3OldCompany extends Company {
    set companyName(companyName: string) {
        this.set("name", companyName);
    }
}
