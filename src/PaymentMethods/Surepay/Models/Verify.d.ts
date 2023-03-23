import { ITransaction } from "../../../Models/ITransaction";
import IBankAccount from "../../../Models/Services/IBankAccount";
export interface IVerify extends ITransaction {
    bankAccount: Required<Omit<IBankAccount, 'bic'>>;
}
export declare const Verify: (data: IVerify) => {
    iban: string;
    customeraccountname: string;
};
